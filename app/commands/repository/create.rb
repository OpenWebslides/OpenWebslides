# frozen_string_literal: true

module Repository
  ##
  # Create a repository in the backing store
  #
  class Create < RepoCommand
    def execute
      write_lock do
        # Create and populate local repository
        exec Filesystem::Init
        exec Git::Init

        # Render empty deck
        exec Filesystem::Render do |c|
          c.content = ''
        end

        # Initial commit
        exec Git::Commit do |c|
          c.author = @receiver.user
          c.message = 'Initial commit'
          c.params = { :parents => [] }
        end

        return unless OpenWebslides.config.github.enabled

        # Create and sync remote repository
        exec Remote::Init
        exec Remote::Sync
      end
    end
  end
end
