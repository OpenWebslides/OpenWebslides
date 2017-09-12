# frozen_string_literal: true

module OpenWebslides
  class RepoMissingError < Error
    def initialize(repo_path)
      super :title => 'Repo does not exist',
            :detail => "The repository at '#{repo_path}' does not exist"
    end
  end
end
