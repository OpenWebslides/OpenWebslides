# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  ##
  # Resource
  #
  def index?
    # Everyone can list notifications
    true
  end

  def show?
    # Users can show notifications if the subject and object are showable
    Pundit.policy!(@user, @record.object).show? && Pundit.policy!(@user, @record.subject).show?
  end

  ##
  # Relationship: subject
  #
  def show_subject?
    # Users can only show subject relationship if the notification is showable
    # Authorize the subject separately in the controller
    show?
  end

  ##
  # Relationship: object
  #
  def show_object?
    # Users can only show object relationship if the notification is showable
    # Authorize the object separately in the controller
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope
    def resolve
      # Defer asset scoping to the respective objects
      DeckPolicy::Scope.new(@user, scope.joins(:object)).resolve
    end
  end
end
