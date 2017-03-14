# frozen_string_literal: true
module Api
  class TagResource < JSONAPI::Resource
    attributes :name

    has_many :decks
  end
end
