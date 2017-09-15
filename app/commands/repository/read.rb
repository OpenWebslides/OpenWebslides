# frozen_string_literal: true

module Repository
  ##
  # Read the contents of a repository in the backing store
  #
  class Read < RepoCommand
    def execute
      read_lock do
        # Get repository contents
        body = exec Filesystem::Read

        body.children.to_html.strip
      end
    end
  end
end
