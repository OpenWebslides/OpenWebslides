# frozen_string_literal: true
require_relative 'ssh/connection'
require_relative 'ssh/repository'

module OpenWebslides
  module Provider
    def self.type
      'ssh'
    end
  end
end
