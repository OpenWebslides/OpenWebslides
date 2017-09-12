# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Create and populate repository directory
    #
    class Init < RepoCommand
      def execute
        exec Filesystem::Create

        # Populate local repo
        raise OpenWebslides::NoTemplateError, @receiver.template unless Dir.exist? template_path
        FileUtils.cp_r "#{template_path}/.", repo_path

        # Delete unnecessary files
        FileUtils.rm File.join repo_path, 'index.html.erb'
        FileUtils.rm_r File.join(repo_path, '.git'), :secure => true
      end
    end
  end
end
