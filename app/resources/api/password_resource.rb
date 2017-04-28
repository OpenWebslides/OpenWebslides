# frozen_string_literal: true

module Api
  class PasswordResource < ApiResource
    abstract

    ##
    # Properties
    #
    attributes :reset_password_token, :email, :password, :password_confirmation

    ##
    # Filters
    #
    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.creatable_fields(_ = {})
      # Creation only needs email
      %i[email]
    end

    def self.updatable_fields(_ = {})
      %i[reset_password_token password password_confirmation]
    end
  end
end
