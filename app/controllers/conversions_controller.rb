# frozen_string_literal: true

class ConversionsController < ApplicationController
  include Uploadable

  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized

  # Upload actions
  upload_action :create

  # POST /conversions
  def create
    @conversion = Conversion.new :user => current_user,
                                 :status => :queued,
                                 :filename => uploaded_file.path,
                                 :name => uploaded_filename

    authorize @conversion

    if service.create
      jsonapi_render_upload :json => @conversion, :status => :created
    else
      jsonapi_render_upload_errors :json => @conversion, :status => :unprocessable_entity
    end
  end

  # GET /conversions/:id
  def show
    @conversion = Conversion.find params[:id]

    authorize @conversion

    jsonapi_render :json => @conversion
  end

  protected

  def service
    ConversionService.new @conversion
  end
end
