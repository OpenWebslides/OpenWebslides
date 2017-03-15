# frozen_string_literal: true
require 'openwebslides/provider/github/repository'

module OpenWebslides
  module Provider
    class Github
      def initialize(deck)
        @deck = deck
      end

      def init; end

      def destroy; end
    end
  end
end
