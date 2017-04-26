# frozen_string_literal: true

module Api
  class UnconfirmedError < ApiError
    def errors
      [JSONAPI::Error.new(:code => JSONAPI::FORBIDDEN,
                          :status => :forbidden,
                          :title => 'Account not confirmed',
                          :detail => 'Your account has not been confirmed yet')]
    end
  end
end
