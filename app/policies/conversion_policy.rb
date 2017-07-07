# frozen_string_literal: true

class ConversionPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  ##
  # Resource
  #
  def index?
    # Only users can list conversions
    !@user.nil?
  end

  def create?
    # Users can queue a conversion but only for itself
    !@user.nil? && @record.user == @user
  end

  def show?
    # Users can show a conversion but only its own
    !@user.nil? && @record.user == @user
  end

  ##
  # Relationship: user
  #
  def show_user?
    show?
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      # Users can see its own conversions
      scope.where(:user => @user)
    end
  end
end
