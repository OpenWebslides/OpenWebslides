# frozen_string_literal: true

class AnnotationPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def create?
    return false if @user.nil?
    return false if @record.deck.nil?
    return false if @record.user.nil?

    # Users can create but only for showable deck and updatable user
    deck_policy.show? && user_policy.update?
  end

  def show?
    # Users can show but only for showable deck and user
    if @record.secret?
      deck_policy.show? && user_policy.show? && @record.user == @user
    else
      deck_policy.show? && user_policy.show?
    end
  end

  def update?
    return false if @user.nil?
    return false if @record.deck.nil?
    return false if @record.user.nil?

    # Users can update but only for showable deck and updatable user
    deck_policy.show? && user_policy.update?
  end

  def destroy?
    return false if @user.nil?

    # Users can destroy but only for showable deck and updatable user
    deck_policy.show? && user_policy.update?
  end

  ##
  # Relationship: user
  #
  def show_user?
    return false if @record.user.nil?

    # Users can show user but only for showable user
    user_policy.show?
  end

  ##
  # Relationship: deck
  #
  def show_deck?
    return false if @record.user.nil?

    # Users can show user but only for showable deck
    deck_policy.show?
  end

  ##
  # State machine
  #
  def fsm_edit?
    update?
  end

  def fsm_flag?
    return false if @user.nil?

    # Users can flag but only for showable deck and user, except owner
    deck_policy.show? && user_policy.show? && @user != @record.user
  end

  def fsm_hide?
    return false if @user.nil?

    # Users can hide but only for destroyable annotation or updatable deck
    destroy? || deck_policy.update?
  end

  def fsm_protect?
    # Users can protect but only for destroyable annotation
    destroy?
  end

  def fsm_publish?
    # Users can protect but only for destroyable annotation
    destroy?
  end

  def fsm_rate?
    return false if @user.nil?

    # Users can rate but only for showable annotation
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      # Database value for 'secret' state
      secret_state_value = Annotation.state_machine.states.find { |s| s.name == :secret }.value

      new_scope = scope.joins(:deck).where
      new_scope = if @user
                    # Don't include secret annotations belonging to other users
                    new_scope.not('annotations.state = ? AND annotations.user_id != ?', secret_state_value, @user.id)
                  else
                    # Don't include any secret annotations
                    new_scope.not('annotations.state = ?', secret_state_value)
                  end

      # Defer annotation scoping to the respective decks
      DeckPolicy::Scope.new(@user, new_scope).resolve
    end
  end

  private

  def deck_policy
    @deck_policy ||= Pundit.policy! @user, @record.deck
  end

  def user_policy
    @user_policy ||= Pundit.policy! @user, @record.user
  end
end
