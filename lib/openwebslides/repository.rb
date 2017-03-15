# frozen_string_literal: true
module OpenWebslides
  class Repository
    def initialize(deck)
      @deck = deck

      # TODO: move this
      provider = "#{OpenWebslides::Configuration.provider.type}_provider".camelize
      @provider = OpenWebslides::Provider.const_get(provider).new deck
    end

    def init
      # Create local repository
      FileUtils.mkdir_p repo_path

      # Create remote repository
      @provider.init

      # Populate local repository
      Rugged::Repository.clone_at OpenWebslides::Configuration.repository_seed, repo_path

      sync
    end

    def sync
      # Synchronize remote repository
    end

    def destroy
      # Destroy local repository
      FileUtils.remove_entry_secure repo_path

      # Destroy remote repository
      @provider.destroy
    end

    private

    def repo_path
      # TODO: avoid collisions
      @deck.repository = "#{@deck.owner.email.parameterize}-#{@deck.name.parameterize}"

      File.join OpenWebslides::Configuration.repository_path, @deck.repository
    end

    def repo
      @repository ||= Rugged::Repository.new repo_path
    end
  end
end
