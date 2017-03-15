# frozen_string_literal: true
require 'openwebslides/provider/ssh/connection'
require 'openwebslides/provider/ssh/repository'

module OpenWebslides
  module Provider
    def self.type
      'ssh'
    end
  end
end
