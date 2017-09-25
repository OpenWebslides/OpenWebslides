# frozen_string_literal: true

class AnnotationService < ApplicationService
  attr_accessor :annotation

  def initialize(annotation)
    @annotation = annotation
  end

  def create
    @annotation.save

    if @annotation.save
      Notification.create :subject => @annotation.user,
                          :predicate => (@annotation.is_a?(Conversation) ? :conversation_created : :comment_created),
                          :deck => @annotation.deck,
                          :item => @annotation
      true
    else
      false
    end
  end

  def update(params)
    if params.key? :secret
      if params[:secret] == 'true' || params[:secret] == true
        @annotation.protect
      else
        @annotation.publish
      end
    else
      @annotation.assign_attributes params.except :secret
      @annotation.edit
    end
  end

  def protect
    @annotation.protect
  end

  def publish
    @annotation.publish
  end

  def flag
    @annotation.flag
  end

  def delete
    # Allow deleting an annotation only if it is secret
    if @annotation.secret?
      @annotation.destroy
    else
      @annotation.hide
    end
  end
end
