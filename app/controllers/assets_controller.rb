# frozen_string_literal: true

class AssetsController < ApplicationController
  include BinaryUploadable
  include Relationships
  include RelatedResources

  # Authentication
  before_action :authenticate_user, :only => %i[create destroy]

  # Authorization
  after_action :verify_authorized, :except => %i[show_relationship get_related_resources]
  after_action :verify_policy_scoped, :only => %i[get_related_resources]
  after_action :verify_authorized_or_policy_scoped, :only => :show_relationship

  upload_action :create

  skip_before_action :jsonapi_request_handling, :only => :show

  # POST /assets
  def create
    @asset = Asset.new :deck => deck,
                       :filename => File.basename(uploaded_filename)

    authorize @asset

    service.create :author => current_user, :file => uploaded_file

    head :created
  end

  # GET /assets/:id
  def show
    @asset = Asset.new :deck => deck,
                       :filename => params[:id]

    authorize @asset

    begin
      file = service.find
    rescue OpenWebslides::FileMissingError
      raise JSONAPI::Exceptions::RecordNotFound, params[:id]
    end

    # Send file
    send_file file
  end

  # DELETE /assets/:id
  def destroy
    @asset = Asset.new :deck => deck,
                       :filename => params[:id]

    authorize @asset

    begin
      service.delete :author => current_user
    rescue OpenWebslides::FileMissingError
      raise JSONAPI::Exceptions::RecordNotFound, params[:id]
    end

    head :no_content
  end

  protected

  def service
    AssetService.new @asset
  end

  def deck
    @deck ||= Deck.find params[:deck_id]
  end
end
