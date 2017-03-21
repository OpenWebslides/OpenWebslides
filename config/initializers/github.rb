# frozen_string_literal: true
require 'openwebslides/configuration'

if OpenWebslides::Configuration.provider.type == 'github'
  Octokit.configure do |config|
    config.login = OpenWebslides::Configuration.provider.github_user
    config.password = OpenWebslides::Configuration.provider.github_passphrase

    config.api_endpoint = OpenWebslides::Configuration.provider.github_api
  end
end
