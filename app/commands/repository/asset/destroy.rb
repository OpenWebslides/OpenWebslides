# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Write asset file
    #
    class Destroy < AssetCommand
      attr_accessor :author

      def execute
        raise ArgumentError 'No author specified' unless @author

        File.delete asset_file

        # Commit
        exec_deck Git::Commit do |c|
          c.author = @author
          c.message = "Delete #{@receiver.filename}"
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
