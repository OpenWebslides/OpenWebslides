# frozen_string_literal: true

module JSONAPI
  module Exceptions
    class UnconfirmedError < Error
      def initialize(error_object_overrides = {})
        super error_object_overrides
      end

      def errors
        params = {
          :code => JSONAPI::FORBIDDEN,
          :status => :forbidden,
          :title => I18n.translate('jsonapi-resources.exceptions.unconfirmed.title',
                                   :default => 'Account not confirmed'),
          :detail => I18n.translate('jsonapi-resources.exceptions.unconfirmed.detail',
                                    :default => 'Your account has not been confirmed yet.')
        }

        [create_error_object(params)]
      end
    end
  end
end
