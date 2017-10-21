# frozen_string_literal: true

class ConversationsController < AnnotationsController
  def create
    @resource = model_klass.new annotation_params

    authorize @resource

    if service.create
      # Make the annotation secret by default
      @resource.protect

      jsonapi_render :json => @resource, :status => :created
    else
      jsonapi_render_errors :json => @resource, :status => :unprocessable_entity
    end
  end
end
