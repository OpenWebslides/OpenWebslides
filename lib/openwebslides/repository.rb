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
      when 'local'
      else
        raise OpenWebslides::ConfigurationError, 'Unknown provider type'
      end
    end

    def init
      raise OpenWebslides::RepoExistsError if Dir.exist? repo_path

      # Create local repo
      FileUtils.mkdir_p repo_path

      # Populate local repo
      FileUtils.cp_r "#{@deck.template_path}/.", repo_path

      # Delete unnecessary files
      FileUtils.rm File.join repo_path, 'index.html.erb'
      FileUtils.rm_r File.join(repo_path, '.git'), :secure => true

      # Render empty file
      command = UpdateRepoCommand.new @deck

      command.author = @deck.owner
      command.content = ''

      # Write repo content but don't commit
      command.write_file

      # Initialize local repo
      Rugged::Repository.init_at repo_path

      # Initial commit
      commit @deck.owner, 'Initial commit', :parents => []

      return unless @provider

      # Create remote repository
      @provider.init

      # Set local repo remotes
      repo.remotes.create REMOTE_NAME, @provider.remote

      sync
    rescue OpenWebslides::RepoExistsError => e
      # Do not handle RepoExistsErrors
      raise e
    rescue => e
      # Try to remove the repo if any other error
      FileUtils.rm_r repo_path, :secure => true if Dir.exist? repo_path

      raise e
    end

    def sync
      return unless @provider

      # Push to remote repository
      repo.remotes.first.push 'refs/heads/master', :credentials => credentials

      # Update additional data
      @provider.sync
    end

    def destroy
      # Destroy local repository
      FileUtils.rm_r repo_path, :secure => true

      return unless @provider

      # Destroy remote repository
      @provider.destroy
    end

    def commit(author, message, options = {})
      repo.checkout 'refs/heads/master' unless repo.index.count.zero?

      index = repo.index
      index.add_all

      commit_tree = index.write_tree repo
      index.write

      commit_author = { :email => author.email, :name => author.name, :time => Time.now }

      commit_options = {
        :author => commit_author,
        :committer => commit_author,
        :message => message,
        :parents => repo.empty? ? [] : [repo.head.target],
        :tree => commit_tree,
        :update_ref => 'HEAD'
      }

      Rugged::Commit.create repo, commit_options.merge(options)
    end

    private

    def repo_path
      File.join OpenWebslides::Configuration.repository_path, @deck.canonical_name
    end

    def repo
      @repo ||= Rugged::Repository.new repo_path
    end

    def credentials
      return @credentials if @credentials

      user = OpenWebslides::Configuration.provider.user
      raise OpenWebslides::ConfigurationError, 'No user specified' unless user

      private_key = OpenWebslides::Configuration.provider.private_key
      raise OpenWebslides::ConfigurationError, 'No private key specified' unless private_key

      @credentials = Rugged::Credentials::SshKey.new :username => user, :privatekey => private_key
    end
  end
end
