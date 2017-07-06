# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    true
  end

  def create?
    true
  end

  def show?
    true
  end

  def update?
    # Users can only update their own account
    !@user.nil? && @user == @record
  end

  def destroy?
    update?
  end

  class Scope < Scope
    def resolve
      @scope.all
    end
  end
end
