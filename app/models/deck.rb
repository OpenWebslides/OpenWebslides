class Deck < ApplicationRecord
  validates :name, :presence => true
  validates :upstream, :presence => true

  enum :state => [:public, :protected, :private]

  belongs_to :owner, :class_name => User

  has_many :contributors, :class_name => User
end
