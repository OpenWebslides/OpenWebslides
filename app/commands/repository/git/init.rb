# frozen_string_literal: true

module Repository
  module Git
    ##
    # Create local repository
    #
    class Init < RepoCommand
      def execute
        # Initialize local repo
        Rugged::Repository.init_at repo_path
      end
    end
  end
end
