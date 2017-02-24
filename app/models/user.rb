class User < ApplicationRecord
  validates :name, :presence => true
  validates :email, :presence => true

  has_many :decks

  has_many :contributions, :class_name => Deck
end
