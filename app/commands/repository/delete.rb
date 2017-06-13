# frozen_string_literal: true

module Repository
  ##
  # Destroy a repository in the backing store
  #
  class Delete < Command
    def execute
      # Delete local repository
      exec Filesystem::Destroy

      return unless OpenWebslides.config.github.enabled

      # Delete remote repository
      exec Remote::Destroy
    end
  end
end
