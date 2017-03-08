# frozen_string_literal: true
class Deck < ApplicationRecord
  ##
  # Properties
  #
  validates :name, :presence => true
  validates :repository, :presence => true, :uniqueness => true

  enum :state => [:public_access, :protected_access, :private_access]
  validates :state, :presence => true

  belongs_to :owner, :class_name => 'User', :foreign_key => 'user_id'

  has_and_belongs_to_many :contributors, :class_name => 'User'
  has_and_belongs_to_many :tags

  ##
  # Callbacks
  #
  before_create :create_repository
  before_destroy :destroy_repository

  ##
  # Methods
  #
  def create_repository
    OpenWebslides::Provider::Repository.create name
  end

  def destroy_repository
    OpenWebslides::Provider::Repository.destroy name
  end
end
