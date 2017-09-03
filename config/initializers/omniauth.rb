# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  before_callback_phase do |env|
    # TODO: verify state
    query_params = Rack::Utils.parse_nested_query env['QUERY_STRING']
    env['rack.session']['omniauth.state'] = query_params['state']
  end

  provider :cas,
           :host => 'login.ugent.be'
end
