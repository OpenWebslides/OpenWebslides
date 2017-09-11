# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Update an asset in the backing store with a file
    #
    class Update < AssetCommand
      attr_accessor :author, :file

      def execute
        raise OpenWebslides::ArgumentError, 'Filename not specified' unless filename
        raise OpenWebslides::ArgumentError, 'Author not specified' unless author
        raise OpenWebslides::ArgumentError, 'File not specified' unless file
        raise OpenWebslides::ArgumentError, 'File does not exist' unless File.exist? file

        exists = File.exist? asset_file

        # Copy asset file
        exec Asset::Copy do |c|
          c.file = file
        end

        # Commit
        exec Git::Commit do |c|
          c.author = author
          c.message = "#{exists ? 'Update' : 'Add'} #{filename}"
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
