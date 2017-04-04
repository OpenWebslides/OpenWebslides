# frozen_string_literal: true

module Api
  class TagResource < JSONAPI::Resource
    include Pundit::Resource

    attributes :name

    has_many :decks
  end
end
