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

        # Create assets in database
        Dir[File.join repo_path, 'assets', '*'].each do |asset|
          @receiver.assets.create :filename => File.basename(asset).strip.downcase
        end

        exec Filesystem::Rebuild

        return unless OpenWebslides.config.github.enabled

        # Create and sync remote repository
        exec Remote::Init
        exec Remote::Sync
      end
    end
  end
end
