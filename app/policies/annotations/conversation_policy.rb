# frozen_string_literal: true

module Annotations
  class ConversationPolicy < AnnotationPolicy
    ##
    # Relationship: comments
    #
    def create_comments?
      # Users can never create comments relationship
      false
    end

    def show_comments?
      # Users can only show comments if the annotation is showable
      # Policy scope separately in the controller
      show?
    end

    def update_comments?
      # Users can never update comments relationship
      false
    end

    def destroy_comments?
      # Users can never destroy comments relationship
      false
    end

    ##
    # Scope
    #
    class Scope < Scope; end
  end
end
