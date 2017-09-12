# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Create repository directory
    #
    class Create < RepoCommand
      def execute
        raise OpenWebslides::RepoExistsError, repo_path if Dir.exist? repo_path

        FileUtils.mkdir_p repo_path
      end
    end
  end
end
