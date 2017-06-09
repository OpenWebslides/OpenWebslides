# frozen_string_literal: true

module Repository
  module Git
    ##
    # Destroy local repository
    #
    class Destroy < Command
      def execute
        Octokit.delete_repository "#{OpenWebslides.config.github.organization}/#{@receiver.canonical_name}"
      end
    end
  end
end
