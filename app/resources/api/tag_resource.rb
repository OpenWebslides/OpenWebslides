# frozen_string_literal: true

module Api
  class TagResource < ApiResource
    include Pundit::Resource

    attributes :name

    has_many :decks
  end
end
