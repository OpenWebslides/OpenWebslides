# frozen_string_literal: true

class CommentService < AnnotationService
  def create
    super

    # Don't continue on model errors
    return unless @annotation.persisted?

    CommentMailer.create(@annotation).deliver_later
  end

  def delete
    # Hide annotation text
    @annotation.text = I18n.t 'openwebslides.annotations.hidden'

    super
  end
end
