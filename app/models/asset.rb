# frozen_string_literal: true

class Asset < ApplicationRecord
  ##
  # Properties
  #
  validates :filename, :presence => true, :uniqueness => { :scope => :deck }

  ##
  # Associations
  #
  belongs_to :deck

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
