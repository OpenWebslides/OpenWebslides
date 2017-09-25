# frozen_string_literal: true

class ItemsController < ApplicationController
  include RelatedResources

  # Authentication
  after_action :renew_token
end
