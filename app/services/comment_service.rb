# frozen_string_literal: true

class CommentService < AnnotationService
  def delete
    # Hide annotation text
    @annotation.text = I18n.t 'openwebslides.annotations.hidden'

    super
  end
end
