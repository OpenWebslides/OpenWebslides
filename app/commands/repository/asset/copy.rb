# frozen_string_literal: true

require 'fileutils'

module Repository
  module Asset
    ##
    # Copy asset file
    #
    class Copy < AssetCommand
      attr_accessor :path

      def execute
        raise 'Filename not specified' unless filename
        raise 'Path not specified' unless path

        raise OpenWebslides::FileMissingError, 'File does not exist' unless File.exist? path

        FileUtils.cp path, asset_file
      end
    end
  end
end
