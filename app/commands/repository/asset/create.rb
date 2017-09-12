# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Update an asset in the backing store
    #
    class Create < AssetCommand
      attr_accessor :author, :path

      def execute
        raise 'Filename not specified' unless filename
        raise 'Author not specified' unless author
        raise 'Path not specified' unless path

        raise OpenWebslides::ArgumentError, 'File does not exist' unless File.exist? path
        raise OpenWebslides::ArgumentError, 'File already exists' if File.exist? asset_file

        # Copy asset file
        exec Asset::Copy do |c|
          c.filename = filename
          c.path = path
        end

        # Commit
        exec Git::Commit do |c|
          c.author = author
          c.message = "Add #{filename}"
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
