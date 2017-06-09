# frozen_string_literal: true

module Repository
  class Read < Command
    def execute
      # Get repository contents
      exec Local::Read
    end
  end
end
