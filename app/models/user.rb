# frozen_string_literal: true
class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :trackable,
         :timeoutable,
         :validatable,
         :omniauthable

  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true

  has_many :decks

  has_and_belongs_to_many :contributions, :class_name => 'Deck'
end
