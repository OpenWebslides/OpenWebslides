# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    include Uploadable

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

        jsonapi_render_upload :json => @asset, :status => :created
      else
        jsonapi_render_upload_errors :json => @asset, :status => :unprocessable_entity
      end
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
