# frozen_string_literal: true
class ClientController < ApplicationController
  def github
    render 'oauth'
  end
end
