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
  belongs_to :deck, :optional => true
  belongs_to :user, :required => true

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
    ConversionWorker.perform_async id
  end
end
