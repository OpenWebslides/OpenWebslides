# frozen_string_literal: true
module Api
  class UserResource < JSONAPI::Resource
    include Pundit::Resource

    ##
    # Properties
    #
    attributes :name, :email, :password

    has_many :decks
    has_many :contributions

    ##
    # Callbacks
    #
    after_create :create_identity

    ##
    # Methods
    #
    def fetchable_fields
      super - [:password]
    end

    def create_identity
      identity = @model.identities.build :uid => @model.email, :provider => 'email'
      identity.save
    end
  end
end
