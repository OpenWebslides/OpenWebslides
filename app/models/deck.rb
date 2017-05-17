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

  ##
  # Callbacks
  #
  before_save :generate_canonical_name
  before_create :create_repository, :unless => :skip_callbacks
  before_destroy :destroy_repository, :unless => :skip_callbacks
  after_initialize :set_default_template

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

  def create_repository
    repo = OpenWebslides::Repository.new self
    repo.init
  end

  def destroy_repository
    repo = OpenWebslides::Repository.new self
    repo.destroy
  end

  def set_default_template
    self.template = OpenWebslides::Configuration.default_template if new_record?
  end

  ##
  # Methods
  #
  def content
    doc = Nokogiri::HTML5 File.read content_file
    doc.at('body').children.to_html.strip
  end

  def content=(value)
    template = ERB.new File.read File.join template_path, 'index.html.erb'

    struct = OpenStruct.new :name => name,
                            :description => description,
                            :content => value

    rendered = template.result(struct.instance_eval { binding })

    File.write content_file, rendered

    touch if persisted?
  end

  def content_file
    File.join OpenWebslides::Configuration.repository_path, canonical_name, 'index.html'
  end

  def template_path
    Rails.root.join 'lib', 'assets', 'templates', template
  end
end
