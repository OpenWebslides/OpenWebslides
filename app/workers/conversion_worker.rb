# frozen_string_literal: true

require 'open3'

##
# Converts a file to a Deck
#
class ConversionWorker
  include Sidekiq::Worker

  sidekiq_options :queue => 'conversion'

  JAR = Rails.root.join 'lib', 'assets', 'conversion', 'OpenWebslidesConverter.jar'

  def perform(conversion_id)
    @conversion = Conversion.find conversion_id

    @conversion.update :status => :processing

    # Create temporary storage
    @output = Dir.mktmpdir 'ows-conversion-'

    logger.info "Starting conversion of #{@conversion.filename} to #{@output}"

    convert_file
    create_deck
    copy_assets

    # Remove temporary storage
    FileUtils.remove_entry_secure @output

    # Delete uploaded file
    File.delete @conversion.filename

    logger.info "Converted file #{@conversion.filename} successfully"

    @conversion.update :status => :success
    @conversion.deck
  rescue => e
    logger.error e

    @conversion.update :status => :error if @conversion

    raise e
  end

  ##
  # Convert PPTX/PDF to HTML
  #
  def convert_file
    command = "java -jar #{JAR} -i #{@conversion.filename} -o #{@output} -t raw"

    stdin, stdout, stderr, wait_thr = Open3.popen3 command
    stdin.close
    stdout.each_line { |l| logger.info l.strip }
    stderr.each_line { |l| logger.error l.strip }

    stdout.close
    stderr.close

    exit_status = wait_thr.value.exitstatus
    raise OpenWebslides::ConversionError, exit_status unless exit_status.zero?
    raise OpenWebslides::ConversionError, 'error converting' unless File.exist? File.join(@output, 'index.html')
  end

  ##
  # Create deck metadata
  #
  def create_deck
    @conversion.deck = Deck.create :owner => @conversion.user, :name => @conversion.name

    doc = Nokogiri::HTML5 File.read File.join @output, 'index.html'
    @conversion.deck.update_repository :author => @conversion.user,
                                       :message => 'Add converted slides',
                                       :content => doc.at('body').children.to_html.strip
  end

  ##
  # Copy assets and create metadata
  #
  def copy_assets
    Dir[File.join @output, 'images', '*'].each do |asset_file|
      logger.info "Copying asset '#{asset_file}'"

      # Create asset metadata
      asset = Asset.create :deck => @conversion.deck, :filename => File.basename(asset_file)

      # Copy asset file
      command = Repository::Asset::UpdateFile.new asset

      command.author = @conversion.user
      command.file = asset_file

      command.execute
    end
  end
end
