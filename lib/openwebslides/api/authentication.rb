# frozen_string_literal: true
require 'jwt'

module OpenWebslides
  module Api
    class Authentication
      def self.encode(payload)
        payload[:expiration] = OpenWebslides::Configuration.api.token_lifetime.to_i.hours.from_now
        JWT.encode payload, secret
      end

      def self.decode(token)
        JWT.decode(token, secret).first
      end

      def self.secret
        Rails.application.secrets.secret_key_base
      end
    end
  end
end
