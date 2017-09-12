# frozen_string_literal: true

module OpenWebslides
  class Error < StandardError
    attr_accessor :title,
                  :detail,
                  :code

    def initialize(params)
      if params.is_a? Hash
        @title = params[:title]
        @detail = params[:detail]
        @code = params[:code] || 422
      else
        @title = 'Unprocessable Entity'
        @detail = params
        @code = 422
      end
    end
  end
end
