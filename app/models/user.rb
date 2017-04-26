# frozen_string_literal: true

class User < ApplicationRecord
  devise :confirmable, :trackable, :validatable
  include JWT::Auth::Authenticatable

  ##
  # Properties
  #
  validates :first_name, :presence => true
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
  before_update :invalidate_token_version

  after_create :email_on_create

  ##
  # Methods
  #
  def self.find_by_token(params)
    user = find_by params
    return nil unless user
    raise Pundit::NotAuthorizedError unless user.confirmed?
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

  ##
  # Callback methods
  #
  def invalidate_token_version
    self.token_version += 1 if password_digest_changed?
  end

  def email_on_create
    UserMailer.on_create(self).deliver
  end
end
