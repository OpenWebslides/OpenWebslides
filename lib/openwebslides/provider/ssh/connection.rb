# frozen_string_literal: true
module OpenWebslides
  module Provider
    class Connection
      def self.connection
        @connection ||= Connection.new
      end

      def initialize
        @session = Net::SSH.start config.host, config.user, opts
      end

      def execute(command)
        stdout_data = ''
        stderr_data = ''
        exit_status = nil
        exit_signal = nil

        @session.open_channel do |channel|
          channel.exec command do |_ch, success|
            abort "Could not execute command '#{command}'" unless success

            channel.on_data do |_ch, data|
              stdout_data += data
            end

            channel.on_extended_data do |_ch, _type, data|
              stderr_data += data
            end

            channel.on_request 'exit-status' do |_ch, data|
              exit_status = data.read_long
            end

            channel.on_request 'exit-signal' do |_ch, data|
              exit_signal = data.read_long
            end
          end
        end

        @session.loop

        [stdout_data, stderr_data, exit_status, exit_signal]
      end

      private

      def config
        OpenWebslides.config.provider
      end

      def opts
        opts = {
          :host_name => config.host,
          :port => config.port || 22,
          :user => config.user
        }

        opts[:password] = config.password if config.password
        opts[:keys] = config.private_key if config.private_key

        opts
      end
    end
  end
end
