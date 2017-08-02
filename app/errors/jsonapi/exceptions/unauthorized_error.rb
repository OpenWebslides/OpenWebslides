# frozen_string_literal: true

module JSONAPI
  module Exceptions
    class UnauthorizedError < Error
      attr_accessor :action, :type

      def initialize(action, type, error_object_overrides = {})
        @action = action
        @type = type
        super error_object_overrides
      end

      def errors
        params = {
          :code => 401,
          :status => :unauthorized,
          :title => I18n.translate('jsonapi-resources.exceptions.unauthorized.title',
                                   :default => "#{action.capitalize} unauthorized",
                                   :action => action.capitalize,
                                   :type => type),
          :detail => I18n.translate('jsonapi-resources.exceptions.unauthorized.detail',
                                    :default => "You don't have permission to #{action} this #{type}.",
                                    :action => action,
                                    :type => type)
        }

        [create_error_object(params)]
      end
    end
  end
end
