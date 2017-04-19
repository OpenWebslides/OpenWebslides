# frozen_string_literal: true

class Identity < ApplicationRecord
  ##
  # Properties
  #
  validates :uid, :presence => true, :uniqueness => { :scope => :provider }
  validates :provider, :presence => true

  belongs_to :user, :required => true

  ##
  # Callbacks
  #
  ##
  # Methods
  #
end
