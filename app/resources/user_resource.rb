# frozen_string_literal: true

class UserResource < ApplicationResource
  ##
  # Properties
  #
  attributes :first_name, :last_name, :email, :password, :tos_accepted

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
    if context[:current_user] == _model
      super - %i[password tos_accepted]
    else
      super - %i[email password tos_accepted]
    end
  end

  def self.creatable_fields(context = {})
    super(context) - %i[decks collaborations conversions]
  end

  def self.updatable_fields(context = {})
    super(context) - %i[email tos_accepted]
  end

  def self.sortable_fields(context)
    super(context) - %i[password tos_accepted]
  end
end
