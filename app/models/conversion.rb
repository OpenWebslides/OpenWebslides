# frozen_string_literal: true

class Conversion < ApplicationRecord
  ##
  # Properties
  #
  enum :status => %i[queued processing success error]

  # Absolute path to uploaded file
  validates :filename, :presence => true,
                       :uniqueness => true

  # Destination repository name
  validates :name, :presence => true

  # Job status
  validates :status, :presence => true

  ##
  # Associations
  #
  belongs_to :deck, :optional => true,
                    :inverse_of => :conversion

  belongs_to :user, :required => true,
                    :inverse_of => :conversions

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
