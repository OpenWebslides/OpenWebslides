# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    include BinaryUploadable

    # Authentication
    before_action :authenticate_user, :except => :raw
    after_action :renew_token, :except => :raw

    # Authorization
    after_action :verify_authorized

    upload_action :create

    skip_before_action :jsonapi_request_handling, :only => :raw

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

    # GET /assets/:id/raw
    def raw
      @asset = Asset.find params[:asset_id]
      return head :not_found unless @asset

      # Authenticate from ?token=
      token = AssetToken.from_token params[:token]

      # Set @jwt for compatibility with jwt-auth's current_user for #authorize
      @jwt = JWT::Auth::Token.from_user token.subject

      authorize @asset, :show?
      return head :unauthorized unless token and token.valid?

      # Retrieve asset in backing store
      command = Repository::Asset::Find.new @asset

      path = command.execute

      # Send file
      send_file path
    end
  end
end
