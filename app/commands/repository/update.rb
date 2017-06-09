# frozen_string_literal: true

module Repository
  class Update < Command
    attr_accessor :author, :content

    def execute
      render = Local::Render.new @receiver
      render.content = @content

      render.execute

      commit = Git::Commit.new @receiver
      commit.author = @author
      commit.message = 'Update content'

      commit.execute

      @receiver.touch
    end
  end
end
