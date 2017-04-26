# frozen_string_literal: true

module Api
  class ApiError < JSONAPI::Exceptions::Error
    attr_accessor :params

    def initialize(params = {})
      @params = params
    end

    def errors
      [JSONAPI::Error.new(:code => params[:code] || JSONAPI::BAD_REQUEST,
                          :status => params[:status] || :bad_request,
                          :title => params[:title] || 'Bad request',
                          :detail => params[:detail] || 'Bad request')]
    end
  end
end
