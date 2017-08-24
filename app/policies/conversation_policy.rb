# frozen_string_literal: true

class ConversationPolicy < AnnotationPolicy
  ##
  # Relationship: comments
  #
  def show_comments?
    # Users can only show comments if the annotation is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope; end
end
