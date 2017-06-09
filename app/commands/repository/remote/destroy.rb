# frozen_string_literal: true

module Repository
  module Remote
    ##
    # Destroy local repository
    #
    class Destroy < Command
      def execute
        return unless OpenWebslides.config.github.enabled

        # Delete remote repository
        Octokit.delete_repository "#{OpenWebslides.config.github.organization}/#{@receiver.canonical_name}"
      end
    end
  end
end
