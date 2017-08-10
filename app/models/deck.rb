# frozen_string_literal: true

class Deck < ApplicationRecord
  ##
  # Properties
  #

  # Deck title
  property :name

  # Deck description
  property :description

  # Unique name
  property :canonical_name

  # HTML template
  property :template

  # Access level
  enum :state => %i[public_access protected_access private_access]

  ##
  # Associations
  #
  belongs_to :owner,
             :required => true,
             :class_name => 'User',
             :foreign_key => 'user_id',
             :inverse_of => :decks

  has_many :grants,
           :dependent => :destroy

  has_many :collaborators,
           :through => :grants,
           :source => :user,
           :class_name => 'User',
           :inverse_of => :collaborations

  has_many :assets,
           :dependent => :destroy,
           :inverse_of => :deck

  has_many :notifications,
           :dependent => :destroy,
           :inverse_of => :deck

  has_one :conversion,
          :dependent => :destroy,
          :inverse_of => :deck

  has_many :annotations,
           :class_name => 'Annotations::Annotation',
           :dependent => :destroy,
           :inverse_of => :deck

  has_many :conversations,
           :class_name => 'Annotations::Conversation',
           :inverse_of => :deck

  ##
  # Validations
  #
  validates :name, :presence => true
  validates :state, :presence => true
  validates :template, :presence => true

  ##
  # Callbacks
  #
  before_save :generate_canonical_name
  after_initialize :set_default_template

  ##
  # Methods
  #
  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #

  private

  def generate_canonical_name
    return if canonical_name?

    self.canonical_name = "#{owner.email.parameterize}-#{name.parameterize}"
    return unless self.class.exists? :canonical_name => canonical_name

    i = 1
    loop do
      i += 1
      candidate = "#{canonical_name}-#{i}"
      unless self.class.exists? :canonical_name => candidate
        self.canonical_name = candidate
        break
      end
    end
  end

  def set_default_template
    self.template = OpenWebslides.config.default_template if new_record?
  end
end
