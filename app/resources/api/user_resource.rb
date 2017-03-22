# frozen_string_literal: true
module Api
  class UserResource < JSONAPI::Resource
    include Pundit::Resource

    attributes :name, :email

    has_many :decks
    has_many :contributions
  end
end
