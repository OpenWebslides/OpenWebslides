# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Find an asset in the repository
    #
    class Find < AssetCommand
      def execute
        asset_file
      end
    end
  end
end
