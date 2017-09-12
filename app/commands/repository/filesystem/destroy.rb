# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Destroy repository directory
    #
    class Destroy < RepoCommand
      def execute
        raise OpenWebslides::RepoMissingError, repo_path if Dir.exist? repo_path

        FileUtils.rm_r repo_path, :secure => true
      end
    end
  end
end
