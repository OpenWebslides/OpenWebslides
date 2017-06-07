# frozen_string_literal: true

class DestroyRepoCommand < RepoCommand
  def execute
    repo.destroy
  end
end
