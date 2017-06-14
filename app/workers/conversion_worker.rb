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

    Dir.mktmpdir 'ows-conversion-' do |output|
      logger.info "Starting conversion of #{file} to #{output}"

      ##
      # Call JAR to convert file
      #
      command = "java -jar #{JAR} -i #{file} -o #{output} -t raw"

      stdin, stdout, stderr, wait_thr = Open3.popen3 command
      stdin.close
      stdout.each_line { |l| logger.info l.strip }
      stderr.each_line { |l| logger.error l.strip }

      stdout.close
      stderr.close

      exit_status = wait_thr.value.exitstatus
      raise ConversionError, exit_status unless exit_status.zero?

      ##
      # Create deck from output
      #
      doc = Nokogiri::HTML5 File.read File.join output, 'index.html'
      deck = Deck.create :owner => User.find(user_id), :name => file.split('/').last

      deck.update_repository :author => deck.owner,
                             :message => 'Add converted slides',
                             :content => doc.at('body').children.to_html.strip

      # TODO: assets

      File.delete file

      logger.info "Converted file #{file} successfully"

      deck
    end
  end
end
