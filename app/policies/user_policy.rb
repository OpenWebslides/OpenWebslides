# frozen_string_literal: true

class UserPolicy
  attr_reader :subject, :object

  def initialize(subject, object)
    @subject = subject
    @object = object
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    # Users can only update their own account
    !@subject.nil? && @subject == @object
  end

  def destroy?
    update?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end
end
