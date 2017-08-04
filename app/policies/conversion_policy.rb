# frozen_string_literal: true

class ConversionPolicy < ApplicationPolicy
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
    # Users can only show user relationship if the conversion is showable
    # Authorize the user separately in the controller
    show?
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    # Users can only show user relationship if the conversion is showable
    # Authorize the deck separately in the controller
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
