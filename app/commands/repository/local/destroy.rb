# frozen_string_literal: true

module Repository
  module Local
    ##
    # Destroy repository directory
    #
    class Destroy < Command
      def execute
        FileUtils.rm_r repo_path, :secure => true
      end

      private

      def repo_path
        File.join OpenWebslides.config.repository_path, @receiver.canonical_name
      end
    end
  end
end
