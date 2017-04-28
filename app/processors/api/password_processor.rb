# frozen_string_literal: true

module Api
  class PasswordProcessor < JSONAPI::Processor
    def create_resource
      # Find user
      User.send_reset_password_instructions :email => params[:data][:attributes][:email]

      # Never return errors to prevent email probing
      JSONAPI::OperationResult.new :no_content
    end

    def replace_fields
      # Find and reset user
      user = User.reset_password_by_token params[:data][:attributes]
      raise Api::ResourceError, user unless user.errors.empty?

      # Find corresponding resource to send back
      resource = UserResource.resources_for([user], context).first

      JSONAPI::ResourceOperationResult.new :ok, resource
    end
  end
end
