# frozen_string_literal: true

require 'open3'

##
# Converts a file to a Deck
#
class ConversionWorker
  include Sidekiq::Worker

  sidekiq_options :queue => 'conversion', :retry => false

  def perform(conversion_id)
    @conversion = Conversion.find conversion_id

    @conversion.update :status => :processing

    # Create temporary storage
    @output = Dir.mktmpdir 'ows-conversion-'

    logger.info "Starting conversion of #{@conversion.filename} to #{@output}"

    convert_file
    create_deck
    copy_assets

    logger.info "Converted file #{@conversion.filename} successfully"

    @conversion.update :status => :success
    @conversion.deck
  rescue => e
    logger.error e

    @conversion.update :status => :error if @conversion

    raise e
  ensure
    # Remove temporary storage
    FileUtils.remove_entry_secure @output if @output

    # Delete uploaded file
    File.delete @conversion.filename if @conversion
  end

  ##
  # Convert PPTX/PDF to HTML
  #
  def convert_file
    command = "java -jar #{OpenWebslides.config.conversion_jar_path} -i #{@conversion.filename} -o #{@output} -t raw"

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
    @deck = Deck.new :owner => @conversion.user, :name => @conversion.name
    DeckService.new(@deck).create

    @conversion.update :deck => @deck

    doc = Nokogiri::HTML5 File.read File.join @output, 'index.html'
    DeckService.new(@conversion.deck).update :author => @conversion.user,
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
      asset = Asset.create :deck => @conversion.deck, :filename => File.basename(asset_file).strip

      # Copy asset file
      command = Repository::Asset::UpdateFile.new asset

      command.author = @conversion.user
      command.file = asset_file

      command.execute
    end

    # Rebuild asset references
    Repository::Filesystem::Rebuild.new(@deck).execute
  end
end
