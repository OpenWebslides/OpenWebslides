# frozen_string_literal: true
module Api
  class ApiController < ApplicationController
    include JSONAPI::ActsAsResourceController
    include Pundit
    include Pundit::ResourceController
    include Knock::Authenticable
  end
end
