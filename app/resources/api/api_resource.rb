# frozen_string_literal: true

module Api
  class ApiResource < JSONAPI::Resource
    include JSONAPI::Authorization::PunditScopedResource

    abstract
  end
end
