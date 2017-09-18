# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Destroy asset file
    #
    class Destroy < AssetCommand
      attr_accessor :author

      def execute
        raise 'Filename not specified' unless filename
        raise 'Author not specified' unless author

        raise OpenWebslides::FileMissingError, 'File does not exist' unless File.exist? asset_file

        File.delete asset_file

        # Commit
        exec Git::Commit do |c|
          c.author = author
          c.message = "Delete #{filename}"
        end

        # Update timestamps
        @receiver.touch

        return unless OpenWebslides.config.github.enabled

        # Sync remote
        exec Remote::Sync
      end
    end
  end
end
