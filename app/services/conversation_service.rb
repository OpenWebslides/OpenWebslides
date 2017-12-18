# frozen_string_literal: true

class ConversationService < AnnotationService
  def create
    super

    ConversationMailer.create(@annotation).deliver_later
  end

  def delete
    # Hide annotation text
    @annotation.text = I18n.t 'openwebslides.annotations.hidden'

    super
  end
end
