# frozen_string_literal: true
class Identity < ApplicationRecord
  validates :uid, :presence => true, :uniqueness => { :scope => :provider }
  validates :provider, :presence => true

  belongs_to :user
end
