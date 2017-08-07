# frozen_string_literal: true

class UserResource < ApplicationResource
  ##
  # Properties
  #
  attributes :first_name, :last_name, :email, :password

  has_many :decks
  has_many :collaborations
  has_many :conversions

  ##
  # Filters
  #
  filters :first_name, :last_name, :email

  ##
  # Callbacks
  #
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

  def self.creatable_fields(context = {})
    super(context) - %i[decks collaborations conversions]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[email]
  end

  def self.sortable_fields(context)
    super(context) - [:password]
  end
end
