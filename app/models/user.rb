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
  ##
  # Methods
  #
  def self.from_token_payload(payload)
    find_by :id => payload['sub'], :token_version => payload['ver']
  end

  def to_token_payload
    { :sub => id, :ver => token_version }
  end
end
