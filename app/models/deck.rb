# frozen_string_literal: true

require 'erb'

class Deck < ApplicationRecord
  ##
  # Properties
  #
  validates :name, :presence => true

  enum :state => %i[public_access protected_access private_access]
  validates :state, :presence => true

  validates :template, :presence => true

  ##
  # Associations
  #
  belongs_to :owner, :class_name => 'User', :foreign_key => 'user_id'
  validates :owner, :presence => true

  has_and_belongs_to_many :collaborators, :class_name => 'User'

  has_many :assets

  ##
  # Callbacks
  #
  before_save :generate_canonical_name
  before_create :create_repository, :unless => :skip_callbacks
  before_destroy :delete_repository, :unless => :skip_callbacks
  after_initialize :set_default_template

  ##
  # Methods
  #
  def create_repository
    Repository::Create.new(self).execute
  end

  def read_repository
    Repository::Read.new(self).execute
  end

  def update_repository(params)
    command = Repository::Update.new self

    command.content = params[:content]
    command.author = params[:author]

    command.execute
  end

  def delete_repository
    Repository::Delete.new(self).execute
  end

  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #

  private

  def generate_canonical_name
    return if canonical_name?

    self.canonical_name = "#{owner.email.parameterize}-#{name.parameterize}"
    return unless self.class.exists? :canonical_name => canonical_name

    i = 1
    loop do
      i += 1
      candidate = "#{canonical_name}-#{i}"
      unless self.class.exists? :canonical_name => candidate
        self.canonical_name = candidate
        break
      end
    end
  end

  def set_default_template
    self.template = OpenWebslides.config.default_template if new_record?
  end
end
