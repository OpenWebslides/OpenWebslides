# frozen_string_literal: true

##
# A binary asset
#
class Asset
  ##
  # Properties
  #

  # Relative path to asset file
  attr_accessor :filename

  ##
  # Associations
  #
  attr_accessor :deck

  ##
  # Methods
  #
  def initialize(params)
    @filename = params[:filename]
    @deck = params[:deck]
  end

  ##
  # Helpers and callback methods
  #
end
