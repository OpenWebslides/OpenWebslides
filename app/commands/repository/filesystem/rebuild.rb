# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Rebuild proper HTML
    #
    class Rebuild < RepoCommand
      def execute
        fix_assets
      end

      ##
      # Fix asset references
      def fix_assets
        doc = Nokogiri::HTML5(exec Filesystem::Read)
        doc.css('img').each do |img|
          filename = File.basename img.attr 'src'

          asset = @receiver.assets.find_by :filename => filename

          # Fix `data-id` attribute (imports and conversions)
          img['data-id'] = asset.id if asset
        end

        update doc.at('body').children.to_html, 'Fix asset references'
      end

      protected

      def update(content, message)
        exec Filesystem::Render do |c|
          c.content = content
        end

        # Commit
        exec Git::Commit do |c|
          c.author = @receiver.owner
          c.message = message
        end
      end
    end
  end
end
