# frozen_string_literal: true

module Repository
  module Filesystem
    ##
    # Create and populate repository directory
    #
    class Init < RepoCommand
      def execute
        # Create local repo
        raise OpenWebslides::RepoExistsError if Dir.exist? repo_path
        FileUtils.mkdir_p repo_path

        # Populate local repo
        raise OpenWebslides::NoTemplateError, "No template found for #{template_path}" unless Dir.exist? template_path
        FileUtils.cp_r "#{template_path}/.", repo_path

        # Delete unnecessary files
        FileUtils.rm File.join repo_path, 'index.html.erb'
        FileUtils.rm_r File.join(repo_path, '.git'), :secure => true
      end
    end
  end
end
