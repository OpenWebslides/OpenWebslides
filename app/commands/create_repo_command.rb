# frozen_string_literal: true

class CreateRepoCommand < RepoCommand
  def execute
    repo.init
  end
end
