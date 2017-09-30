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
        doc = exec Filesystem::Read
        doc.css('img').each do |img|
          filename = File.basename img.attr('src').strip

          asset = @receiver.assets.find_by :filename => filename

          unless asset
            # No such asset, probably a casing issue
            assets = @receiver.assets.where('LOWER(filename) LIKE LOWER(?)', filename)

            raise "#{assets.count} asset files found for reference '#{filename}'" unless assets.one?

            asset = assets.first
          end

          # Fix `data-id` attribute (imports and conversions)
          img['data-id'] = asset.id if asset

          # Fix `src` attribute (conversions)
          img['src'] = "assets/#{filename}"
        end

        update doc.to_html, 'Fix asset references'
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
