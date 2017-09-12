# frozen_string_literal: true

##
# User resource
#
class UserResource < ApplicationResource
  ##
  # Attributes
  #
  attribute :first_name
  attribute :last_name
  attribute :email
  attribute :password
  attribute :tos_accepted

  ##
  # Relationships
  #
  ##
  # Relationships
  #
  has_many :decks
  has_many :collaborations
  has_many :conversions

  ##
  # Filters
  #
  filter :first_name
  filter :last_name
  filter :email

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

  def self.creatable_fields(_context = {})
    []
  end

  def self.updatable_fields(_context = {})
    []
  end

  def self.sortable_fields(context)
    super(context) - %i[password tos_accepted]
  end
end
