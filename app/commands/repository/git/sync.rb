# frozen_string_literal: true

module Repository
  module Git
    class Sync < Command
      def execute
        # Push to remote repository
        repo = Rugged::Repository.new repo_path
        repo.remotes.first.push 'refs/heads/master', :credentials => credentials

        # TODO: sync additional information
      end

      private

      def repo_path
        File.join OpenWebslides::Configuration.repository_path, @receiver.canonical_name
      end

      def credentials
        return @credentials if @credentials

        user = OpenWebslides::Configuration.provider.user
        raise OpenWebslides::ConfigurationError, 'No user specified' unless user

        private_key = OpenWebslides::Configuration.provider.private_key
        raise OpenWebslides::ConfigurationError, 'No private key specified' unless private_key

        @credentials = Rugged::Credentials::SshKey.new :username => user, :privatekey => private_key
      end
    end
  end
end
