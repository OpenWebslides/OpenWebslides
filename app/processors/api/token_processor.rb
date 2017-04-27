# frozen_string_literal: true

module Api
  class TokenProcessor < JSONAPI::Processor
    def create_resource
      data = params[:data][:attributes]

      # Find and authenticate user
      user = User.find_by :email => data[:email]

      raise Api::UnauthorizedError unless user
      raise Api::UnauthorizedError unless user.valid_password?(data[:password])
      raise Api::UnconfirmedError unless user.confirmed?

      # Find corresponding resource to send back
      resource = UserResource.resources_for([user], context).first

      JSONAPI::ResourceOperationResult.new :created, resource
    end
  end
end
