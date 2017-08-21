# frozen_string_literal: true

class AnnotationService < ApplicationService
  attr_accessor :annotation

  def initialize(annotation)
    @annotation = annotation
  end

  def create
    @annotation.save
  end

  def save
    # Calling a state machine instance method also persists the object
    @annotation.edit
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
