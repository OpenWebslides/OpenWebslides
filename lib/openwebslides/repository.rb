# frozen_string_literal: true

module OpenWebslides
  class Repository
    REMOTE_NAME = 'origin'

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
      # Create local repo
      FileUtils.mkdir_p repo_path

      # Populate local repo
      FileUtils.cp_r "#{Rails.root.join('lib', 'assets', 'seed_repository')}/.", repo_path

      # Initialize local repo
      Rugged::Repository.init_at repo_path

      # Initial commit
      index = repo.index
      index.add_all
      index.write

      commit 'Initial commit'

      return unless @provider

      # Create remote repository
      @provider.init

      # Set local repo remotes
      repo.remotes.create REMOTE_NAME, @provider.remote

      sync
    end

    def sync
      # Push to remote repository
      repo.remotes.first.push 'refs/heads/master', :credentials => credentials
    end

    def destroy
      # Destroy local repository
      FileUtils.remove_entry_secure repo_path

      return unless @provider

      # Destroy remote repository
      @provider.destroy
    end

    private

    def repo_path
      File.join OpenWebslides::Configuration.repository_path, @deck.canonical_name
    end

    def repo
      @repository ||= Rugged::Repository.new repo_path
    end

    def credentials
      return @credentials if @credentials

      user = OpenWebslides::Configuration.provider.user
      raise OpenWebslides::ConfigurationError, 'No user specified' unless user

      private_key = OpenWebslides::Configuration.provider.private_key
      raise OpenWebslides::ConfigurationError, 'No private key specified' unless private_key

      @credentials = Rugged::Credentials::SshKey.new :username => user, :privatekey => private_key
    end

    def commit_options
      commit_author = { :email => @deck.owner.email, :name => @deck.owner.name, :time => Time.now }

      {
        :author => commit_author,
        :committer => commit_author,
        :parents => [],
        :tree => repo.index.write_tree(repo),
        :update_ref => 'HEAD'
      }
    end

    def commit(message)
      options = commit_options
      options[:message] = message

      Rugged::Commit.create repo, options
    end
  end
end
