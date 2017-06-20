# frozen_string_literal: true

class Asset < ApplicationRecord
  ##
  # Properties
  #
  validates :filename, :presence => true, :uniqueness => { :scope => :deck }

  ##
  # Associations
  #
  belongs_to :deck

  ##
  # Callbacks
  #
  ##
  # Methods
  #
  def path
    Repository::Asset::Find.new(self).execute
  end

  def update_file(params)
    command = Repository::Asset::Update.new self

    command.content = params[:content]
    command.author = params[:author]

    command.execute
  end

  ##
  # Overrides
  #
  ##
  # Helpers and callback methods
  #
end
