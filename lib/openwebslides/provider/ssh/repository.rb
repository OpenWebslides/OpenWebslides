# frozen_string_literal: true
require 'net/ssh'

module OpenWebslides
  module Provider
    class Repository
      def self.create(repo_name)
        Connection.session.open_channel do |channel|
          channel.exec "mkdir #{File.join OpenWebslides.config.provider.path, repo_name}" do
          end
        end
      end
    end
  end
end
