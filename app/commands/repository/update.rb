# frozen_string_literal: true

module Repository
  class Update < Command
    attr_accessor :author, :content

    def execute
      # Render HTML file
      exec Local::Render do |c|
        c.content = @content
      end

      # Commit
      exec Git::Commit do |c|
        c.author = @author
        c.message = 'Update content'
      end

      # Update timestamps
      @receiver.touch

      # Sync remote
      exec Remote::Sync
    end
  end
end
