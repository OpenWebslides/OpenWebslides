# frozen_string_literal: true
module OpenWebslides
  class Repository
    attr_accessor :provider

    def initialize(deck)
      @deck = deck

      case OpenWebslides::Configuration.provider.type
      when 'ssh'
        @provider = OpenWebslides::Provider::Ssh.new deck
      when 'github'
        @provider = OpenWebslides::Provider::Github.new deck
      else
        raise OpenWebslides::ConfigurationError, 'Unknown provider type'
      end
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
      @deck.canonical_name = "#{@deck.owner.email.parameterize}-#{@deck.name.parameterize}"

      File.join OpenWebslides::Configuration.repository_path, @deck.canonical_name
    end

    def repo
      @repository ||= Rugged::Repository.new repo_path
    end
  end
end
