# frozen_string_literal: true

class User < ApplicationRecord
  include JWT::Auth::Authenticatable
  include Confirmable

  has_secure_password

  ##
  # Properties
  #
  validates :name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true
  validates :token_version, :presence => true

  validate :readonly_email, :on => :update

  ##
  # Associations
  #
  has_many :identities, :dependent => :destroy

  has_many :decks, :dependent => :destroy

  has_and_belongs_to_many :contributions, :class_name => 'Deck'

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def self.find_by_token(params)
    user = find_by params
    raise Pundit::NotAuthorizedError unless user.confirmed?
    user
  end

  def readonly_email
    errors.add :email, 'cannot be changed' if email_changed?
  end
end
