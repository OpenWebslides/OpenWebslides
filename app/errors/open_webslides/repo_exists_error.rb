# frozen_string_literal: true

module OpenWebslides
  class RepoExistsError < Error
    def initialize(repo_path)
      super :title => 'Repo already exists',
            :detail => "The repository at '#{repo_path}' already exists"
    end
  end
end
