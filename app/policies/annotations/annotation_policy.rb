# frozen_string_literal: true

module Annotations
  class AnnotationPolicy < ApplicationPolicy
    ##
    # Resource
    #
    def create?
      return false if @user.nil?

      # Users can create but only for showable deck
      deck_policy.show?
    end

    def show?
      # Users can show but only for showable deck
      deck_policy.show?
    end

    def update?
      return false if @user.nil?

      # Users can update but only for showable deck and updatable user
      deck_policy.show? && user_policy.update?
    end

    def destroy?
      return false if @user.nil?

      # Users can destroy but only for showable deck and destroyable user
      deck_policy.show? && user_policy.destroy?
    end

    ##
    # Relationship: user
    #
    def show_user?
      # Users can show user but only for showable user
      user_policy.show?
    end

    ##
    # Relationship: deck
    #
    def show_deck?
      # Users can show user but only for showable deck
      deck_policy.show?
    end

    ##
    # Scope
    #
    class Scope < Scope
      def resolve
        # Defer annotation scoping to the respective decks
        DeckPolicy::Scope.new(@user, scope.joins(:deck)).resolve
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
end
