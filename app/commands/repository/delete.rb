# frozen_string_literal: true

module Repository
  class Delete < Command
    def execute
      # Delete local repository
      exec Local::Destroy

      # Delete remote repository
      exec Remote::Destroy
    end
  end
end
