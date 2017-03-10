# frozen_string_literal: true
require 'net/ssh'

module OpenWebslides
  module Provider
    class Repository
      def self.create(repo_name)
        command = "mkdir #{File.join OpenWebslides.config.provider.path, repo_name}"
        Connection.connection.execute command
      end

      def self.destroy(repo_name)
        command = "mkdir #{File.join OpenWebslides.config.provider.path, repo_name}"
        Connection.connection.execute command
      end
    end
  end
end
