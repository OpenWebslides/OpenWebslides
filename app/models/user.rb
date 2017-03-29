# frozen_string_literal: true
class User < ApplicationRecord
  has_secure_password

  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true

  has_many :identities

  has_many :decks

  has_and_belongs_to_many :contributions, :class_name => 'Deck'
end
