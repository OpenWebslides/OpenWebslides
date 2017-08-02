# frozen_string_literal: true

class PasswordResource < ApplicationResource
  abstract

  ##
  # Properties
  #
  attributes :reset_password_token, :email, :password

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
