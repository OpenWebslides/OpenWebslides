# frozen_string_literal: true
require 'openwebslides/provider/base'

module OpenWebslides
  module Provider
    class Github < Base
      def init
        options = {
          :description => 'OpenWebslides slidedeck',
          :private => !@deck.public_access?,
          :has_issues => false,
          :has_wiki => false,
          :has_downloads => false,
          :organization => config.path
        }

        # TODO: integrate with authentication/authorization framework
        Octokit.create_repository @deck.canonical_name, options
      end

      def destroy
        raise NotImplementedError
      end
    end
  end
end
