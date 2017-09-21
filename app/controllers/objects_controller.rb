# frozen_string_literal: true

class ObjectsController < ApplicationController
  include RelatedResources

  # Authentication
  after_action :renew_token
end
