# frozen_string_literal: true

module Api
  class UserResource < ApiResource
    ##
    # Properties
    #
    attributes :name, :email, :password
    filters :name, :email

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
      if context[:current_user]
        super - [:password]
      else
        super - %i[email password]
      end
    end

    def self.creatable_fields
      super - %i[decks contributions]
    end

    def self.updatable_fields
      super - %i[email decks contributions]
    end

    def self.sortable_fields(context)
      super(context) - [:password]
    end

    protected

    def create_identity
      identity = @model.identities.build :uid => @model.email, :provider => 'email'
      identity.save
    end
  end
end
