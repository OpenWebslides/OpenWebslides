# frozen_string_literal: true
class Deck < ApplicationRecord
  include OpenWebslides::Repository

  ##
  # Properties
  #
  validates :name, :presence => true
  validates :repository, :uniqueness => true

  enum :state => [:public_access, :protected_access, :private_access]
  validates :state, :presence => true

  belongs_to :owner, :class_name => 'User', :foreign_key => 'user_id'

  has_and_belongs_to_many :contributors, :class_name => 'User'
  has_and_belongs_to_many :tags
end
