# frozen_string_literal: true

class PasswordPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    true
  end

  def update?
    true
  end
end
