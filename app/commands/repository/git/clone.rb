# frozen_string_literal: true

module Repository
  module Git
    ##
    # Clone remote repository
    #
    class Clone < RepoCommand
      attr_accessor :repository

      def execute
        # Clone remote repo
        Rugged::Repository.clone_at repository, repo_path
      end
    end
  end
end
