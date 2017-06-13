# frozen_string_literal: true

module Repository
  ##
  # Repository command
  #
  class RepoCommand < Command
    protected

    def repo_path
      File.join OpenWebslides.config.repository_path, @receiver.canonical_name
    end

    def content_file
      File.join repo_path, 'index.html'
    end

    def template_path
      File.join OpenWebslides.config.template_path, @receiver.template
    end

    def template_file
      File.join template_path, 'index.html.erb'
    end
  end
end
