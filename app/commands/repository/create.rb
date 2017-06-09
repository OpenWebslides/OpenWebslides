# frozen_string_literal: true

module Repository
  class Create < Command
    def execute
      # Create and populate local repository
      exec Local::Init
      exec Git::Init

      # Render empty deck
      exec Local::Render do |c|
        c.content = ''
      end

      # Initial commit
      exec Git::Commit do |c|
        c.author = @receiver.owner
        c.message = 'Initial commit'
        c.params = { :parents => [] }
      end

      # Create and sync remote repository
      exec Remote::Init
      exec Git::Sync
    end
  end
end
