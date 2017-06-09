# frozen_string_literal: true

module Repository
  module Local
    ##
    # Create and populate repository directory
    #
    class Init < Command
      def execute
        # Create local repo
        raise OpenWebslides::RepoExistsError if Dir.exist? repo_path
        FileUtils.mkdir_p repo_path

        # Populate local repo
        raise OpenWebslides::NoTemplateError unless Dir.exist? template_path
        FileUtils.cp_r "#{template_path}/.", repo_path

        # Delete unnecessary files
        FileUtils.rm File.join repo_path, 'index.html.erb'
        FileUtils.rm_r File.join(repo_path, '.git'), :secure => true
      end

      private

      def repo_path
        File.join OpenWebslides.config.repository_path, @receiver.canonical_name
      end

      def template_path
        Rails.root.join 'lib', 'assets', @receiver.template
      end
    end
  end
end
