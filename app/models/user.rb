# frozen_string_literal: true
class User < ApplicationRecord
  has_secure_password

  ##
  # Properties
  #
  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true

  has_many :identities, :dependent => :destroy

  has_many :decks, :dependent => :destroy

  has_and_belongs_to_many :contributions, :class_name => 'Deck'

  ##
  # Callbacks
  #
  before_create :generate_token

  ##
  # Methods
  #
  def generate_token
    self.token = OpenWebslides::Api::Authentication.encode :id => id
  end
end
