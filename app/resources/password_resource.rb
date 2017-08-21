# frozen_string_literal: true

##
# Password resource (resets the user's password)
#
class PasswordResource < ApplicationResource
  abstract

  ##
  # Attributes
  #
  attribute :reset_password_token
  attribute :email
  attribute :password

  ##
  # Relationships
  #
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
    %i[reset_password_token password]
  end
end
