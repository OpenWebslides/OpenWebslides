# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Create repository directory
    #
    class Create < RepoCommand
      def execute
        # Create local repo
        raise OpenWebslides::RepoExistsError if Dir.exist? repo_path
        FileUtils.mkdir_p repo_path
      end
    end
  end
end
