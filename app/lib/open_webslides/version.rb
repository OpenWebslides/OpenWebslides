# frozen_string_literal: true

module OpenWebslides
  def self.version
    @version ||= Version.new
  end

  class Version
    BUILD = '1'

    VERSION = {
      :auth => '1.0.0',
      :user => '1.0.0',
      :deck => '1.0.0',
      :feed => '1.0.0',
      :asst => '1.0.0',
      :annt => '1.0.0',
      :conv => '1.0.0'
    }.freeze

    def build
      BUILD
    end

    def version_string
      platform = "Open Webslides/#{BUILD}"
      features = VERSION.map { |k, v| "#{k}/#{v}" }.join '; '

      "#{platform} (#{features})"
    end
  end
end
