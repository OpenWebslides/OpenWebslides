# frozen_string_literal: true

module Repository
  module Remote
    ##
    # Create remote repository
    #
    class Init < Command
      def execute
        options = {
          :description => @receiver.description || 'OpenWebslides slidedeck',
          :private => !@receiver.public_access?,
          :has_issues => false,
          :has_wiki => false,
          :has_downloads => false,
          :organization => config.path
        }

        Octokit.create_repository @receiver.canonical_name, options

        # Set local repo remotes
        repo = Rugged::Repository.new repo_path
        remote = "#{OpenWebslides.config.github.ssh_user}@#{OpenWebslides.config.github.host}:#{repo_path}"
        repo.remotes.create 'origin', remote
      end

      private

      def repo_path
        File.join OpenWebslides.config.repository_path, @receiver.canonical_name
      end
    end
  end
end
