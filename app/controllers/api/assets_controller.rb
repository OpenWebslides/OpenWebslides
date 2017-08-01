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
      @asset = Asset.new :deck => @deck,
                         :filename => File.basename(uploaded_filename)

      authorize @asset

      if service.create :author => current_user, :file => uploaded_file
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

      service.delete :author => current_user

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
      return head :unauthorized unless token && token.valid?

      # Send file
      send_file service.find
    end

    protected

    def service
      AssetService.new @asset
    end
  end
end
