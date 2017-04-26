# frozen_string_literal: true

module Api
  class DeviseError < ApiError
    attr_accessor :resource

    def initialize(resource)
      @resource = resource
    end

    def errors
      errors = []

      resource.errors.messages.each do |attr, messages|
        messages.each do |message|
          errors << JSONAPI::Error.new(:code => JSONAPI::UNPROCESSABLE_ENTITY,
                                       :status => :unprocessable_entity,
                                       :title => "#{attr.capitalize} #{message}",
                                       :detail => "#{attr.capitalize} #{message}")
        end
      end

      errors
    end
  end
end
