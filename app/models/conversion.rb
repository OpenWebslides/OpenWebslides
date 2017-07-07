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
  belongs_to :deck, :required => true
  belongs_to :user, :required => true

  ##
  # Callbacks
  #
  after_create :queue_job, :unless => :skip_callbacks

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
