# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Find an asset in the repository
    #
    class Find < AssetCommand
      def execute
        raise OpenWebslides::ArgumentError, 'Filename not specified' unless filename
        raise OpenWebslides::ArgumentError, 'File does not exist' unless File.exist? asset_file

        asset_file
      end
    end
  end
end
