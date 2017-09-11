# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Asset command
    #
    class AssetCommand < RepoCommand
      attr_accessor :filename

      protected

      def asset_file
        File.join repo_path, 'assets', filename
      end
    end
  end
end
