# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Update the contents of an asset in the backing store
    #
    class Update < AssetCommand
      attr_accessor :author, :content

      def execute
        raise ArgumentError 'No author specified' unless @author
        raise ArgumentError 'No content specified' unless @content

        # Update file
        exec Asset::Write do |c|
          c.content = @content
        end

        # Commit
        exec_deck Git::Commit do |c|
          c.author = @author
          c.message = "Update #{@receiver.filename}"
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
