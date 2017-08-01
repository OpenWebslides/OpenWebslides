# frozen_string_literal: true

class AssetService
  attr_accessor :asset

  def initialize(asset)
    @asset = asset
  end

  def create(params)
    if @asset.save
      # Create asset in backing store
      command = Repository::Asset::UpdateFile.new @asset

      command.author = params[:author]
      command.file = params[:file].path

      command.execute

      true
    else
      false
    end
  end

  def find
    # Get file path in the backing store
    command = Repository::Asset::Find.new @asset

    command.execute
  end

  def delete(params)
    # Delete file in backing store
    command = Repository::Asset::Destroy.new @asset

    command.author = params[:author]

    command.execute

    # Delete database
    @asset.destroy
  end
end
