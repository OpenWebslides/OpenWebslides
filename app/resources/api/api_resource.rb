# frozen_string_literal: true

module Api
  class ApiResource < JSONAPI::Resource
    include Pundit::Resource

    abstract
  end
end
