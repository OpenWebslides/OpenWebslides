# frozen_string_literal: true
class Deck < ApplicationRecord
  validates :name, :presence => true
  validates :upstream, :presence => true

  enum :state => [:public_access, :protected_access, :private_access]

  belongs_to :owner, :class_name => 'User'

  has_and_belongs_to_many :contributors, :class_name => 'User'
  has_and_belongs_to_many :tags
end
