# frozen_string_literal: true

module Repository
  class Read < Command
    def execute
      # Get repository contents
      Local::Read.new(@receiver).execute
    end
  end
end
