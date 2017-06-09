# frozen_string_literal: true

module Repository
  module Remote
    class Sync < Command
      def execute
        return unless OpenWebslides.config.github.enabled

        # Push to remote repository
        repo = Rugged::Repository.new repo_path
        repo.remotes.first.push 'refs/heads/master', :credentials => credentials

        # TODO: sync additional information
      end

      private

      def repo_path
        File.join OpenWebslides.config.repository_path, @receiver.canonical_name
      end

      def credentials
        return @credentials if @credentials

        user = OpenWebslides.config.github.user
        raise OpenWebslides::ConfigurationError, 'No user specified' unless user

        private_key = OpenWebslides.config.github.private_key
        raise OpenWebslides::ConfigurationError, 'No private key specified' unless private_key

        # TODO: passphrase
        @credentials = Rugged::Credentials::SshKey.new :username => user, :privatekey => private_key
      end
    end
  end
end
