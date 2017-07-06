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
      if @request
        # Include headers for controller specs
        api_headers.each do |k, v|
          @request.env["HTTP_#{k.underscore.upcase}"] = v
          @request.env[k.underscore.upcase] = v
        end
      end

      # Include headers for request specs
      request.headers.merge! headers.merge(api_headers)
      send method, path, :params => params
    end

    define_method("#{method}_authenticated") do |user, path, params = {}, headers = {}|
      extra_headers = auth_headers user

      if @request
        # Include headers for controller specs
        extra_headers.each do |k, v|
          @request.env["HTTP_#{k.underscore.upcase}"] = v
          @request.env[k.underscore.upcase] = v
        end
      end

      # Include headers for request specs
      request.headers.merge! headers.merge(auth_headers user)
      send method, path, :params => params
    end
  end

  # Requests without body don't need Content-Type
  %i[get delete].each do |method|
    define_method("#{method}_unauthenticated") do |path, params = {}, headers = {}|
      if @request
        # Include headers for controller specs
        api_headers.each do |k, v|
          @request.env["HTTP_#{k.upcase}"] = v
        end
      end

      # Include headers for request specs
      request.headers.merge! headers.merge(api_headers).except('Content-Type')
      send method, path, :params => params
    end

    define_method("#{method}_authenticated") do |user, path, params = {}, headers = {}|
      extra_headers = auth_headers user

      if @request
        # Include headers for controller specs
        extra_headers.each do |k, v|
          @request.env["HTTP_#{k.upcase}"] = v
        end
      end

      # Include headers for request specs
      request.headers.merge! headers.merge(extra_headers).except('Content-Type')
      send method, path, :params => params
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
