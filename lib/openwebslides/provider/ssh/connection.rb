# frozen_string_literal: true
module OpenWebslides
  module Provider
    class Connection
      def self.session
        @session ||= Net::SSH.start nil, nil, opts
      end

      def self.opts
        opts = {
          :host_name => config.host,
          :port => config.port || 22,
          :user => config.user
        }

        opts[:password] = config.password if config.password
        opts[:keys] = config.private_key if config.private_key

        opts
      end

      def self.config
        OpenWebslides.config.provider
      end
    end
  end
end
