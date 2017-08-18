# frozen_string_literal: true

class CommentPolicy < AnnotationPolicy
  ##
  # Relationship: conversation
  #
  def show_conversation?
    # Users can only show conversation if the annotation is showable
    # Policy scope separately in the controller
    show?
  end

  ##
  # Scope
  #
  class Scope < Scope; end
end
