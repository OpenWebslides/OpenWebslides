# frozen_string_literal: true

module RequestHelper
  ##
  # Use the following methods to add the appropriate headers
  # - get_unauthenticated
  # - post_unauthenticated
  # - put_unauthenticated
  # - patch_unauthenticated
  # - delete_unauthenticated
  #
  # - get_authenticated
  # - post_authenticated
  # - put_authenticated
  # - patch_authenticated
  # - delete_authenticated
  #
  %i[get post put patch].each do |method|
    define_method("#{method}_unauthenticated") do |path, params = {}, headers = {}|
      send method, path, :params => params, :headers => headers.merge(api_headers)
    end

    define_method("#{method}_authenticated") do |user, path, params = {}, headers = {}|
      extra_headers = auth_headers user

      # Include headers for controller specs
      @request.env['HTTP_AUTHORIZATION'] = extra_headers['Authorization'] if @request

      # Include headers for request specs
      send method, path, :params => params, :headers => headers.merge(auth_headers user)
    end
  end

  # Requests without body don't need Content-Type
  %i[get delete].each do |method|
    define_method("#{method}_unauthenticated") do |path, params = {}, headers = {}|
      send method, path, :params => params, :headers => headers.merge(api_headers).except('Content-Type')
    end

    define_method("#{method}_authenticated") do |user, path, params = {}, headers = {}|
      extra_headers = auth_headers user

      # Include headers for controller specs
      @request.env['HTTP_AUTHORIZATION'] = extra_headers['Authorization'] if @request

      # Include headers for request specs
      send method, path, :params => params, :headers => headers.merge(extra_headers).except('Content-Type')
    end
  end

  protected

  def api_headers
    {
      'Content-Type' => 'application/vnd.api+json',
      'Accept' => 'application/vnd.api+json'
    }
  end

  def auth_headers(user)
    api_headers.merge 'Authorization' => "Bearer #{JWT::Auth::Token.from_user(user).to_jwt}"
  end
end
