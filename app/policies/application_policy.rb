# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    raise OpenWebslides::NotImplementedError
  end

  def create?
    raise OpenWebslides::NotImplementedError
  end

  def show?
    raise OpenWebslides::NotImplementedError
  end

  def update?
    raise OpenWebslides::NotImplementedError
  end

  def destroy?
    raise OpenWebslides::NotImplementedError
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      raise OpenWebslides::NotImplementedError
    end
  end
end
