# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

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
