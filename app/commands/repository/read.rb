# frozen_string_literal: true

module Repository
  ##
  # Read the contents of a repository in the backing store
  #
  class Read < Command
    def execute
      # Get repository contents
      exec Filesystem::Read
    end
  end
end
