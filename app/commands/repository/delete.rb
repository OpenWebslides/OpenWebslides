# frozen_string_literal: true

module Repository
  ##
  # Destroy a repository in the backing store
  #
  class Delete < RepoCommand
    def execute
      write_lock do
        # Delete local repository
        exec Filesystem::Destroy

        return unless OpenWebslides.config.github.enabled

        # Delete remote repository
        exec Remote::Destroy
      end
    end
  end
end
