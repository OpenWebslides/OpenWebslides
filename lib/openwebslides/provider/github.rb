# frozen_string_literal: true
require_relative 'github/repository'

module OpenWebslides
  module Provider
    def self.type
      'github'
    end
  end
end
