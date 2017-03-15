# frozen_string_literal: true
require 'net/ssh'

module OpenWebslides
  module Provider
    class Repository
      def self.create(repository)
        puts "Creating #{repository}"
      end

      def self.destroy(repository)
        puts "Removing #{repository}"
      end
    end
  end
end
