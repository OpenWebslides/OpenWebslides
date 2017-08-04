# frozen_string_literal: true

class Deck < ApplicationRecord
  ##
  # Properties
  #
  validates :name, :presence => true

  enum :state => %i[public_access protected_access private_access]
  validates :state, :presence => true

  validates :template, :presence => true

  ##
  # Associations
  #
  belongs_to :owner, :class_name => 'User', :foreign_key => 'user_id'
  validates :owner, :presence => true

  has_many :grants
  has_many :collaborators, :class_name => 'User', :through => :grants, :source => :user

  has_many :assets, :dependent => :delete_all

  has_one :conversion, :dependent => :destroy

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
