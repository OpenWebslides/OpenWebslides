# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Update an asset in the backing store with a file
    #
    class UpdateFile < AssetCommand
      attr_accessor :author, :file

      def execute
        raise OpenWebslides::ArgumentError, 'No author specified' unless @author
        raise OpenWebslides::ArgumentError, 'No file specified' unless @file

        exists = File.exist? asset_file

        # Copy asset file
        exec Asset::Copy do |c|
          c.file = @file
        end

        # Commit
        exec_deck Git::Commit do |c|
          c.author = @author
          c.message = "#{exists ? 'Update' : 'Add'} #{@receiver.filename}"
        end

        # Update timestamps
        @receiver.touch
        @receiver.deck.touch

        return unless OpenWebslides.config.github.enabled

        # Sync remote
        exec_deck Remote::Sync
      end
    end
  end
end
