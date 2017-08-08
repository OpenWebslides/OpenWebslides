# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :confirmable, :recoverable, :trackable, :validatable
  include JWT::Auth::Authenticatable

  ##
  # Properties
  #
  validates :first_name, :presence => true
  validates :email, :presence => true,
                    :format => { :with => /\A[^@]+@[^@]+\z/ },
                    :uniqueness => true
  validates :token_version, :presence => true,
                            :numericality => { :only_integer => true }

  validate :readonly_email, :on => :update

  ##
  # Associations
  #
  has_many :identities, :dependent => :destroy

  has_many :decks, :dependent => :destroy,
                   :inverse_of => :owner

  has_many :conversions, :dependent => :destroy,
                         :inverse_of => :user

  has_many :grants, :dependent => :destroy
  has_many :collaborations, :class_name => 'Deck',
                            :through => :grants,
                            :source => :deck,
                            :inverse_of => :collaborators

  has_many :notifications, :dependent => :destroy,
                           :inverse_of => :user

  ##
  # Callbacks
  #
  before_create :create_email_identity

  ##
  # Methods
  #
  def self.find_by_token(params)
    user = find_by params
    return nil unless user
    raise JSONAPI::Exceptions::UnconfirmedError unless user.confirmed?
    user
  end

  def name
    last_name? ? "#{first_name} #{last_name}" : first_name
  end

  def readonly_email
    errors.add :email, 'cannot be changed' if email_changed?
  end

  def increment_token_version
    self.token_version += 1
  end

  def increment_token_version!
    increment_token_version
    save!
  end

  def create_email_identity
    identities.build :provider => 'email', :uid => email
  end

  ##
  # Overrides
  #
  def password=(new_password)
    increment_token_version
    super new_password
  end

  ##
  # Helpers and callback methods
  #
end
