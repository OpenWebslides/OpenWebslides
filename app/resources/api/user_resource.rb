# frozen_string_literal: true

module Api
  class UserResource < ApiResource
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

    protected

    def create_identity
      identity = @model.identities.build :uid => @model.email, :provider => 'email'
      identity.save
    end
  end
end
