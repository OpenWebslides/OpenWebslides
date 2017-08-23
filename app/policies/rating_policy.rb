# frozen_string_literal: true

class RatingPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    return false if @user.nil?
    return false if @record.annotation.nil?
    return false if @record.user.nil?

    # Users can create but only for showable annotation and updatable user
    annotation_policy.show? && user_policy.update?
  end

  def destroy?
    return false if @user.nil?

    # Users can destroy but only for showable annotation and updatable user
    annotation_policy.show? && user_policy.update?
  end

  private

  def annotation_policy
    @annotation_policy ||= Pundit.policy! @user, @record.annotation
  end

  def user_policy
    @user_policy ||= Pundit.policy! @user, @record.user
  end
end
