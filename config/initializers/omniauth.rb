# frozen_string_literal: true
Rails.application.config.middleware.use OmniAuth::Builder do
  oauth_config = OpenWebslides::Configuration.oauth2

  # TODO: enable state checking
  options = {
    :scope => 'user:email',
    :provider_ignores_state => true
  }
  provider :github, oauth_config.github_id, oauth_config.github_secret, options
end
