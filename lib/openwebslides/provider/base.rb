# frozen_string_literal: true

module OpenWebslides
  module Provider
    class Base
      attr_accessor :deck

      def initialize(deck)
        @deck = deck
      end

      ##
      # Upstream repository url
      #
      def remote
        "#{config.user}@#{config.host}:#{repo_path}"
      end

      def init
        raise OpenWebslides::NotImplementedError
      end

      def destroy
        raise OpenWebslides::NotImplementedError
      end

      def sync
        raise OpenWebslides::NotImplementedError
      end

      private

      def repo_path
        "#{File.join config.path, @deck.canonical_name}.git"
      end

      def config
        OpenWebslides::Configuration.provider
      end
    end
  end
end
