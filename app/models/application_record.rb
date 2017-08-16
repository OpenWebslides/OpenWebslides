# frozen_string_literal: true

##
# Abstract database record
#
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  ##
  # Dummy method to define a property
  #
  def self.property(*_); end
end
