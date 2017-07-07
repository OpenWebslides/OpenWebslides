# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    true
  end

  def show?
    true
  end

  ##
  # Relationship: user
  #
  def show_user?
    true
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    true
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      @scope.all
    end
  end
end
