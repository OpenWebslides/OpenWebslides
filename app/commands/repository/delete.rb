# frozen_string_literal: true

module Repository
  class Delete < Command
    def execute
      # Delete remote repository
      Remote::Destroy.new(@receiver).execute

      # Delete local repository
      Local::Destroy.new(@receiver).execute
    end
  end
end
