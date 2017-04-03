# frozen_string_literal: true
Rails.application.config.middleware.use OmniAuth::Builder do
  oauth_config = OpenWebslides::Configuration.oauth2

  before_callback_phase do |env|
    # TODO: verify state
    query_params = Rack::Utils.parse_nested_query env['QUERY_STRING']
    env['rack.session']['omniauth.state'] = query_params['state']
  end

  provider :github, oauth_config.github_id, oauth_config.github_secret, :scope => 'user:email'
  provider :google_oauth2, oauth_config.google_id, oauth_config.google_secret
end
