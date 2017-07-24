# frozen_string_literal: true

module RequestHelper
  def headers
    @headers
  end

  def add_content_type_header
    (@headers ||= {}).merge! 'Content-Type' => 'application/vnd.api+json'
  end

  def add_accept_header
    (@headers ||= {}).merge! 'Accept' => 'application/vnd.api+json'
  end

  def add_auth_header
    (@headers ||= {}).merge! 'Authorization' => "Bearer #{JWT::Auth::Token.from_user(user).to_jwt}"
  end
end
