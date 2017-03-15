# frozen_string_literal: true
class Deck < ApplicationRecord
  ##
  # Properties
  #
  validates :name, :presence => true
  validates :canonical_name, :presence => true, :uniqueness => true

  enum :state => [:public_access, :protected_access, :private_access]
  validates :state, :presence => true

  belongs_to :owner, :class_name => 'User', :foreign_key => 'user_id'

  has_and_belongs_to_many :contributors, :class_name => 'User'
  has_and_belongs_to_many :tags

  ##
  # Callbacks
  #
  before_validation :generate_canonical_name
  before_create :create_repository
  before_destroy :destroy_repository

  ##
  # Methods
  #
  def generate_canonical_name
    self.canonical_name = "#{owner.email.parameterize}-#{name.parameterize}"
    return unless self.class.exists? :canonical_name => canonical_name

    i = 2
    candidate = nil
    loop do
      i += 1
      candidate = "#{canonical_name}-#{i}"
      break unless self.class.exists? :canonical_name => candidate
    end

    self.canonical_name = candidate
  end

  def create_repository
    repo = OpenWebslides::Repository.new self
    repo.init
  end

  def destroy_repository
    repo = OpenWebslides::Repository.new self
    repo.destroy
  end
end
