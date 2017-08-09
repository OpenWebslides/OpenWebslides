# frozen_string_literal: true

class Asset < ApplicationRecord
  ##
  # Properties
  #

  # Relative path to asset file
  property :filename

  ##
  # Associations
  #
  belongs_to :deck, :required => true,
                    :inverse_of => :assets

  ##
  # Validations
  #
  validates :filename,
            :presence => true,
            :uniqueness => { :scope => :deck }

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
