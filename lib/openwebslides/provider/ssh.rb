# frozen_string_literal: true
require 'openwebslides/provider/ssh/connection'

module OpenWebslides
  module Provider
    class SshProvider
      def initialize(deck)
        @deck = deck
      end

      def remote
        user = OpenWebslides::Configuration.provider.user
        host = OpenWebslides::Configuration.provider.host
        "#{user}@#{host}:#{repo_path}"
      end

      def init
        # TODO: try to init remote repository using Rugged

        command = "git init --bare #{repo_path}"
        _, _, exit_status = Connection.connection.execute command

        raise CommandError, "Command '#{command}' exited with status #{exit_status}" unless exit_status.zero?
      end

      def destroy
        command = "rm -r #{repo_path}"
        _, _, exit_status = Connection.connection.execute command

        raise CommandError, "Command '#{command}' exited with status #{exit_status}" unless exit_status.zero?
      end

      private

      def repo_path
        "#{File.join config.path, @deck.canonical_name}.git"
      end

      def config
        OpenWebslides::Configuration.provider
      end
    end
  end
end
