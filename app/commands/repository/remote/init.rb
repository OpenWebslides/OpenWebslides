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
        repo.remotes.create 'origin', "#{config.user}@#{config.host}:#{repo_path}"
      end

      private

      def repo_path
        File.join OpenWebslides::Configuration.repository_path, @receiver.canonical_name
      end

      def config
        OpenWebslides::Configuration.provider
      end
    end
  end
end
