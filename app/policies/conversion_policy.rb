# frozen_string_literal: true

class ConversionPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def create?
    # Users can queue a conversion but only for itself
    !@user.nil? && @record.user == @user
  end

  class Scope < Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      # Users can see its own conversions
      scope.where(:user => @user)
    end
  end
end
