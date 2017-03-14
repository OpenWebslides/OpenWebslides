# frozen_string_literal: true
module Api
  class DeckResource < JSONAPI::Resource
    attributes :name, :state

    has_one :owner

    has_many :contributors
    has_many :tags
  end
end
