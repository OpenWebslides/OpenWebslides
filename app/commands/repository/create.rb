# frozen_string_literal: true

module Repository
  class Create < Command
    def execute
      # Create and populate local repository
      Local::Init.new(@receiver).execute
      Git::Init.new(@receiver).execute

      # Render empty deck
      render = Local::Render.new @receiver
      render.content = ''

      render.execute

      # Initial commit
      commit = Git::Commit.new @receiver
      commit.author = @receiver.owner
      commit.message = 'Initial commit'
      commit.params = { :parents => [] }

      commit.execute

      # Create and sync remote repository
      Remote::Init.new(@receiver).execute
      Git::Sync.new(@receiver).execute
    end
  end
end
