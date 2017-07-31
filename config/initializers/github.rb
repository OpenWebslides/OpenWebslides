# frozen_string_literal: true

require_relative 'openwebslides'

if OpenWebslides.config.github.enabled == 'github'
  Octokit.configure do |config|
    config.login = OpenWebslides.config.github.github_user
    config.password = OpenWebslides.config.github.github_passphrase

    config.api_endpoint = OpenWebslides.config.github.github_api
  end
end
