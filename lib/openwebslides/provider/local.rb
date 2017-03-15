# frozen_string_literal: true
module OpenWebslides
  module Provider
    def self.type
      'local'
    end

    class Repository
      def self.create; end

      def self.destroy; end
    end
  end
end
