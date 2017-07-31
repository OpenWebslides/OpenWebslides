# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    include BinaryUploadable

    # Authentication
    before_action :authenticate_user, :except => :show
    after_action :renew_token

    # Authorization
    after_action :verify_authorized

    upload_action :create

    # POST /assets
    def create
      @deck = Deck.find params[:deck_id]
      @asset = Asset.new :deck => @deck

      authorize @asset

      # Create asset
      @asset.filename = File.basename uploaded_filename

      if @asset.save
        # Update asset in backing store
        command = Repository::Asset::UpdateFile.new @asset

        command.author = current_user
        command.file = uploaded_file.path

        command.execute

        jsonapi_render :json => @asset, :status => :created
      else
        jsonapi_render_errors :json => @asset, :status => :unprocessable_entity
      end
    end

    # GET /assets/:id
    def show
      @asset = Asset.find params[:id]

      authorize @asset

      jsonapi_render :json => @asset
    end

    # DELETE /assets/:id
    def destroy
      @asset = Asset.find params[:id]

      authorize @asset

      # Destroy asset in backing store
      command = Repository::Asset::Destroy.new @asset

      command.author = current_user

      command.execute

      # Destroy asset in the database
      @asset.destroy

      head :no_content
    end
  end
end
