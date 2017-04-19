# frozen_string_literal: true

class User < ApplicationRecord
  include JWT::Auth::Authenticatable

  has_secure_password

  ##
  # Properties
  #
  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true
  validates :token_version, :presence => true

  has_many :identities, :dependent => :destroy

  has_many :decks, :dependent => :destroy

  has_and_belongs_to_many :contributions, :class_name => 'Deck'

  ##
  # Callbacks
  #
  ##
  # Methods
  #
end
