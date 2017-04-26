# frozen_string_literal: true

module Api
  class UnauthorizedError < ApiError
    def errors
      [JSONAPI::Error.new(:code => JSONAPI::UNAUTHORIZED,
                          :status => :unauthorized,
                          :title => 'Unauthorized',
                          :detail => 'Incorrect email or password')]
    end
  end
end
