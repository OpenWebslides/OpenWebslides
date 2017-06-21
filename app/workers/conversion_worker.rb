# frozen_string_literal: true

require 'open3'

##
# Converts a file to a Deck
#
class ConversionWorker
  include Sidekiq::Worker

  JAR = Rails.root.join 'lib', 'assets', 'conversion', 'OpenWebslidesConverter.jar'

  def perform(file, user_id)
    raise ArgumentError, "File '#{file}' not found" unless File.exist? file

    @file = file
    @author = User.find user_id
    raise ArgumentError, "User '#{user_id}' not found" unless @author

    # Create temporary storage
    @output = Dir.mktmpdir 'ows-conversion-'

    logger.info "Starting conversion of #{@file} to #{@output}"

    convert_file
    create_deck
    copy_assets

    # Remove temporary storage
    FileUtils.remove_entry_secure @output

    # Delete uploaded file
    File.delete @file unless Rails.env.development?

    logger.info "Converted file #{@file} successfully"

    @deck
  end

  ##
  # Convert PPTX/PDF to HTML
  #
  def convert_file
    command = "java -jar #{JAR} -i #{@file} -o #{@output} -t raw"

    stdin, stdout, stderr, wait_thr = Open3.popen3 command
    stdin.close
    stdout.each_line { |l| logger.info l.strip }
    stderr.each_line { |l| logger.error l.strip }

    stdout.close
    stderr.close

    exit_status = wait_thr.value.exitstatus
    raise OpenWebslides::ConversionError, exit_status unless exit_status.zero?
  end

  ##
  # Create deck metadata
  #
  def create_deck
    doc = Nokogiri::HTML5 File.read File.join @output, 'index.html'
    @deck = Deck.create :owner => @author, :name => File.basename(@file)

    @deck.update_repository :author => @author,
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
      asset = Asset.create :deck => @deck, :filename => File.basename(asset_file)

      # Copy asset file
      command = Repository::Asset::UpdateFile.new asset

      command.author = @author
      command.file = asset_file

      command.execute
    end
  end
end
