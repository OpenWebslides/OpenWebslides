# frozen_string_literal: true

##
# A conversion job
#
class Conversion < ApplicationRecord
  ##
  # Properties
  #

  # Job status
  enum :status => %i[queued processing success error]

  # Absolute path to uploaded file
  property :filename

  # Destination repository name
  property :name

  ##
  # Associations
  #
  belongs_to :deck,
             :optional => true,
             :inverse_of => :conversion

  belongs_to :user,
             :required => true,
             :inverse_of => :conversions

  ##
  # Validations
  #
  validates :filename,
            :presence => true,
            :uniqueness => true

  validates :name,
            :presence => true

  validates :status,
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
