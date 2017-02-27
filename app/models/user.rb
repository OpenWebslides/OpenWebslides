# frozen_string_literal: true
class User < ApplicationRecord
  validates :name, :presence => true
  validates :email, :presence => true, :format => { :with => /@/ }

  has_many :decks

  has_and_belongs_to_many :contributions, :class_name => 'Deck'
end
