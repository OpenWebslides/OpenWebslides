# frozen_string_literal: true

class Asset < ApplicationRecord
  ##
  # Properties
  #

  # Asset filename
  validates :filename, :presence => true, :uniqueness => { :scope => :deck }

  ##
  # Associations
  #
  belongs_to :deck, :required => true

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def path
    Repository::Asset::Find.new(self).execute
  end

  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #
end
