# frozen_string_literal: true

require 'openwebslides/provider/base'
require 'openwebslides/provider/ssh/connection'

module OpenWebslides
  module Provider
    class Ssh < Base
      def init
        command = "git init --bare #{repo_path}"
        _, _, exit_status = Connection.connection.execute command

        raise CommandError, "Command '#{command}' exited with status #{exit_status}" unless exit_status.zero?
      end

      def destroy
        command = "rm -r #{repo_path}"
        _, _, exit_status = Connection.connection.execute command

        raise CommandError, "Command '#{command}' exited with status #{exit_status}" unless exit_status.zero?
      end

      def sync; end
    end
  end
end
