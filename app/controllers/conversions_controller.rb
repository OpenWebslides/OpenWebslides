# frozen_string_literal: true

class ConversionsController < ApplicationController
  include Uploadable
  include Relationships
  include RelatedResources

  # Authentication
  before_action :authenticate_user
  after_action :renew_token

  # Authorization
  after_action :verify_authorized, :except => %i[show_relationship get_related_resources]
  after_action :verify_policy_scoped, :only => %i[get_related_resources]
  after_action :verify_authorized_or_policy_scoped, :only => :show_relationship

  # Upload actions
  upload_action :create

  ##
  # Resource
  #

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

  ##
  # Relationships
  #
  # Relationships and related resource actions are implemented in the respective concerns
  #

  protected

  def service
    ConversionService.new @conversion
  end
end
