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
    !@subject.nil? && @subject == @object
  end

  def destroy?
    update?
  end
end
