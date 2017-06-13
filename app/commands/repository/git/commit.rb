# frozen_string_literal: true

module Repository
  module Git
    class Commit < RepoCommand
      attr_accessor :author, :message, :params

      def execute
        repo = Rugged::Repository.new repo_path

        repo.checkout 'refs/heads/master' unless repo.index.count.zero?

        index = repo.index
        index.add_all

        commit_tree = index.write_tree repo
        index.write

        commit_author = { :email => @author.email, :name => @author.name, :time => Time.now }

        commit_options = {
          :author => commit_author,
          :committer => commit_author,
          :message => @message,
          :parents => repo.empty? ? [] : [repo.head.target],
          :tree => commit_tree,
          :update_ref => 'HEAD'
        }

        commit_options.merge! @params if @params

        Rugged::Commit.create repo, commit_options
      end
    end
  end
end
