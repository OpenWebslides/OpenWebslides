# frozen_string_literal: true
module OpenWebslides
  module Provider
    class GithubProvider
      def initialize(deck)
        @deck = deck
      end

      def remote; end

      def init; end

      def destroy; end
    end
  end
end
