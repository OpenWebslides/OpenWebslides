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

    def repo_file
      File.join repo_path, 'index.html'
    end

    def lock_path
      File.join Rails.root.join 'tmp', 'locks'
    end

    def template_path
      File.join OpenWebslides.config.template_path, @receiver.template
    end

    def template_file
      File.join template_path, 'index.html.erb'
    end

    ##
    # Exclusively lock a repository
    #
    def write_lock(&block)
      lock File::LOCK_EX, block
    end

    ##
    # Shared lock a repository
    #
    def read_lock(&block)
      lock File::LOCK_SH, block
    end

    private

    def lock(type, block)
      Dir.mkdir lock_path unless Dir.exist? lock_path

      file = File.join lock_path, "#{@receiver.id}.lock"

      File.open(file, File::RDWR | File::CREAT, 0o644) do |lock|
        begin
          lock.flock type

          block.call
        ensure
          lock.flock File::LOCK_UN
        end
      end
    end
  end
end
