# frozen_string_literal: true
module OpenWebslides
  module Provider
    class SshProvider
      def initialize(deck)
        @deck = deck
      end

      def init; end

      def destroy; end
    end
  end
end
