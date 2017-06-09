# frozen_string_literal: true

module Repository
  module Git
    ##
    # Destroy local repository
    #
    class Destroy < Command
      def execute
        Octokit.delete_repository "#{config.path}/#{@receiver.canonical_name}"
      end

      private

      def config
        OpenWebslides::Configuration.provider
      end
    end
  end
end
