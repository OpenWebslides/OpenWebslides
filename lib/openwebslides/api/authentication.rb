# frozen_string_literal: true
require 'jwt'

module OpenWebslides
  module Api
    class Authentication
      def self.encode(payload)
        JWT.encode payload, secret
      end

      def self.decode(payload)
        JWT.decode(payload, secret).first
      end

      def self.secret
        Rails.application.secrets.secret_key_base
      end
    end
  end
end
