# frozen_string_literal: true

##
# Abstract annotation
#
class Annotation < ApplicationRecord
  ##
  # Properties
  #
  property :content_item_id
  property :state

  ##
  # Associations
  #
  belongs_to :user,
             :required => true,
             :inverse_of => :annotations

  belongs_to :deck,
             :required => true,
             :inverse_of => :annotations

  has_many :ratings,
           :dependent => :destroy,
           :inverse_of => :annotation

  ##
  # Validations
  #
  validates :content_item_id,
            :presence => true

  validates :state,
            :presence => true

  ##
  # State
  #
  state_machine :initial => :created do
    state :created, :value => 0
    state :edited, :value => 1
    state :secret, :value => 2
    state :flagged, :value => 3
    state :hidden, :value => 4

    # Edit an annotation
    event :edit do
      transition :created => :edited,
                 :edited => :edited,
                 :secret => :secret
    end

    # Flag an annotation
    event :flag do
      transition :created => :flagged,
                 :edited => :flagged
    end

    # Hide an annotation
    event :hide do
      transition :created => :hidden,
                 :secret => :hidden,
                 :edited => :hidden,
                 :flagged => :hidden
    end

    # Protect (privatize) an annotation
    event :protect do
      transition :created => :secret
    end

    # Publish (publicize) an annotation
    event :publish do
      transition :secret => :created
    end
  end

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
