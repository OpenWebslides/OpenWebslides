# frozen_string_literal: true

module Repository
  module Asset
    ##
    # Asset command
    #
    class AssetCommand < Command
      protected

      def asset_path
        File.join OpenWebslides.config.repository_path, @receiver.deck.canonical_name, 'assets'
      end

      def asset_file
        File.join asset_path, @receiver.filename
      end

      ##
      # Execute an action (internal helper)
      #
      def exec_deck(klass)
        command = klass.new @receiver.deck
        yield command if block_given?

        command.execute
      end
    end
  end
end
