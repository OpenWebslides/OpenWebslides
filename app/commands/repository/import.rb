# frozen_string_literal: true

module Repository
  ##
  # Import an existing repository in the backing store
  #
  class Import < RepoCommand
    attr_accessor :repository

    def execute
      raise ArgumentError, 'No repository specified' unless @repository

      write_lock do
        # Create and populate local repository
        exec Filesystem::Create
        exec Git::Clone do |c|
          c.repository = repository
        end

        # Create assets in database and reference them
        assets = {}

        Dir[File.join repo_path, 'assets', '*'].each do |asset|
          asset_model = @receiver.assets.create :filename => File.basename(asset)

          assets[File.basename asset] = asset_model.id
        end

        # Fix the `data-id` attribute
        doc = Nokogiri::HTML5(exec Filesystem::Read)
        doc.css('img').each do |img|
          filename = File.basename img.attr 'src'

          img['data-id'] = assets[filename] if assets.include? filename
        end

        exec Filesystem::Render do |c|
          c.content = doc.to_html
        end

        # Commit
        exec Git::Commit do |c|
          c.author = @receiver.owner
          c.message = 'Fix asset references'
        end

        return unless OpenWebslides.config.github.enabled

        # Create and sync remote repository
        exec Remote::Init
        exec Remote::Sync
      end
    end
  end
end
