# frozen_string_literal: true

class TokenPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    true
  end

  def destroy?
    true
  end
end
