# frozen_string_literal: true

class AssetService < ApplicationService
  attr_accessor :asset

  def initialize(asset)
    @asset = asset
  end

  ##
  # Create asset in the backing store
  #
  def create(params)
    command = Repository::Asset::Create.new asset.deck

    command.filename = asset.filename
    command.author = params[:author]
    command.path = params[:file].path

    command.execute
  end

  ##
  # Get asset path in the backing store
  #
  def find
    command = Repository::Asset::Find.new asset.deck

    command.filename = asset.filename

    command.execute
  end

  ##
  # Delete asset in the backing store
  #
  def delete(params)
    command = Repository::Asset::Destroy.new asset.deck

    command.filename = asset.filename
    command.author = params[:author]

    command.execute
  end
end
