# frozen_string_literal: true

class ConfirmationPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    true
  end
end
