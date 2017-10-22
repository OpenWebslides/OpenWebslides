# frozen_string_literal: true

module OpenWebslides
  def self.version
    @version ||= Version.new
  end

  class Version
    attr_accessor :app, :build, :version

    def initialize
      @app = 'Open Webslides'
      @build = '1'
      @version = {
        :auth => '1.0.0',
        :user => '1.0.0',
        :deck => '1.0.0',
        :feed => '1.0.0',
        :asst => '1.0.0',
        :annt => '1.0.0',
        :conv => '1.0.0',
      }
    end

    def version_string
      platform = "#{@app}/#{@build}"
      features = @version.map { |k, v| "#{k}/#{v}" }.join '; '

      "#{platform} (#{features})"
    end

    class << self
      def parse(value)
        data = %r{^(?<app>[a-zA-Z ]+)\/(?<build>[0-9]+) \((?<version>.*)\)$}.match value

        v = OpenWebslides::Version.new

        v.app = data['app']
        v.build = data['build']
        v.version = data['version'].split(';')
                                   .map(&:strip)
                                   .map { |s| { s.split('/')[0].to_sym => s.split('/')[1] } }
                                   .reduce({}, :merge)

        v
      rescue
        raise OpenWebslides::ArgumentError, "Invalid version string: '#{value}'"
      end
    end
  end
end
