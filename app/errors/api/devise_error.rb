# frozen_string_literal: true

module Api
  class DeviseError < JSONAPI::Exceptions::Error
    attr_accessor :resource

    def initialize(resource)
      @resource = resource
    end

    def errors
      errors = []

      resource.errors.messages.each do |attr, messages|
        messages.each do |message|
          errors << JSONAPI::Error.new(:code => JSONAPI::BAD_REQUEST,
                                       :status => :bad_request,
                                       :title => "#{attr.capitalize} #{message}",
                                       :detail => "#{attr.capitalize} #{message}")
        end
      end

      errors
    end
  end
end
