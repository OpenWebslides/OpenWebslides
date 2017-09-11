# frozen_string_literal: true

require 'fileutils'

module Repository
  module Asset
    ##
    # Copy asset file
    #
    class Copy < AssetCommand
      attr_accessor :file

      def execute
        raise OpenWebslides::ArgumentError, 'Filename not specified' unless filename
        raise OpenWebslides::ArgumentError, 'File not specified' unless file
        raise OpenWebslides::ArgumentError, 'File does not exist' unless File.exist? file

        FileUtils.cp file, asset_file
      end
    end
  end
end
