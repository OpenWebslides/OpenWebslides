# frozen_string_literal: true

module RequestsHelper
  def post_with_accept_header(path, params = {}, headers = {})
    post path, :params => params, :headers => headers.merge(accept_header)
  end

  def post_with_headers(path, params = {}, headers = {})
    post path, :params => params, :headers => headers.merge(api_headers)
  end

  protected

  def accept_header
    { 'Accept' => 'application/vnd.api+json' }
  end

  def api_headers
    {
      'Content-Type' => 'application/vnd.api+json',
      'Accept' => 'application/vnd.api+json'
    }
  end
end
