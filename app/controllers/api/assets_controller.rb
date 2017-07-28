# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    # Authentication
    before_action :authenticate_user, :except => :show
    after_action :renew_token

    # Authorization
    after_action :verify_authorized

    skip_before_action :jsonapi_request_handling, :only => %i[create show]

    # POST /assets
    def create
      unless request.content_type == JSONAPI::UPLOAD_MEDIA_TYPE
        raise JSONAPI::Exceptions::UnsupportedUploadMediaTypeError, request.content_type
      end

      @deck = Deck.find relationship_params[:deck_id]
      @asset = Asset.new :deck => @deck

      authorize @asset

      # Copy uploaded file to tempfile
      # TODO: sanitize filenames
      raise Api::ApiError, error_params('Invalid filename') unless params[:qqfilename]
      filename = params[:qqfilename]

      # Create tempfile with proper extension
      raise Api::ApiError, error_params('Invalid file') unless params[:qqfile]
      file = Tempfile.new ['', ".#{filename.split('.').last}"]
      file.close
      FileUtils.cp params[:qqfile].path, file.path

      # Create asset
      @asset.filename = File.basename filename
      @asset.save

      # Update asset in backing store
      command = Repository::Asset::UpdateFile.new @asset

      command.author = current_user
      command.file = file.path

      command.execute

      # Render result
      setup_request
      jsonapi_render_upload :json => @asset, :status => :created
    rescue => e
      jsonapi_render_upload_errors e, :json => @conversion, :status => :unprocessable_entity
    end

    # GET /assets/:id
    def show
      @asset = Asset.find params[:id]

      authorize @asset

      # Retrieve asset in backing store
      command = Repository::Asset::Find.new @asset

      path = command.execute

      # Send file
      send_file path
    end

    # DELETE /assets/:id
    def destroy
      @asset = Asset.find params[:id]

      authorize @asset

      @asset.destroy

      head :no_content
    end
  end
end
