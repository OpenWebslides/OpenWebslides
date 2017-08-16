# frozen_string_literal: true

##
# A login identity attached to a user account
#
class Identity < ApplicationRecord
  ##
  # Properties
  #

  # Unique user identifier
  property :uid

  # Identity provider
  property :provider

  ##
  # Associations
  #
  belongs_to :user,
             :required => true

  ##
  # Validations
  #
  validates :uid,
            :presence => true,
            :uniqueness => { :scope => :provider }

  validates :provider,
            :presence => true

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #
end
