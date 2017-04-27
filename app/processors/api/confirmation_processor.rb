# frozen_string_literal: true

module Api
  class ConfirmationProcessor < JSONAPI::Processor
    def create_resource
      # Find and confirm user
      user = User.confirm_by_token params[:data][:attributes][:confirmation_token]
      raise Api::ResourceError, user unless user.errors.empty?

      # Find corresponding resource to send back
      resource = UserResource.resources_for([user], context).first

      JSONAPI::ResourceOperationResult.new :created, resource
    end
  end
end
