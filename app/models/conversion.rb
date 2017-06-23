# frozen_string_literal: true

class Conversion < ApplicationRecord
  ##
  # Properties
  #
  enum :status => %i[queued processing success error]

  validates :filename, :presence => true,
                       :uniqueness => true
  validates :name, :presence => true
  validates :status, :presence => true

  ##
  # Associations
  #
  belongs_to :deck
  belongs_to :user

  ##
  # Callbacks
  #
  after_create :queue_job

  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #

  def queue_job
    raise OpenWebslides::NotImplementedError
  end
end
