# frozen_string_literal: true

module Repository
  module Git
    ##
    # Create local repository
    #
    class Init < Command
      def execute
        # Initialize local repo
        Rugged::Repository.init_at repo_path
      end

      private

      def repo_path
        File.join OpenWebslides::Configuration.repository_path, @receiver.canonical_name
      end
    end
  end
end
