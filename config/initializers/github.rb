# frozen_string_literal: true

require_relative '../openwebslides'

if OpenWebslides.config.github.enabled
  Octokit.configure do |config|
    config.login = OpenWebslides.config.github.repo_user
    config.password = OpenWebslides.config.github.repo_user_passphrase

    config.api_endpoint = OpenWebslides.config.github.api_endpoint
  end
end
