# frozen_string_literal: true

module Api
  class AssetsController < ApiController
    MEDIA_TYPE = '*/*'

    before_action :authenticate_user

    def show
      return super unless media_types_for('Accept').include? MEDIA_TYPE

      asset = Asset.find params[:id]

      # TODO: Authorize show
      context[:policy_used]&.call

      send_file asset.path
    end

    def update
      return super unless request.content_type == MEDIA_TYPE

      asset = Asset.find params[:id]

      # Authorize update
      raise Pundit::NotAuthorizedError unless AssetPolicy.new(current_user, asset).update?
      context[:policy_used]&.call

      asset.update_file :author => current_user, :content => request.body

      head :no_content
    end
  end
end
