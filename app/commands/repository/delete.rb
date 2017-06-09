# frozen_string_literal: true

module Repository
  class Delete < Command
    def execute
      # Delete remote repository
      exec Remote::Destroy

      # Delete local repository
      exec Local::Destroy
    end
  end
end
