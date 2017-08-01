# frozen_string_literal: true

require 'rspec/expectations'

RSpec::Matchers.define :be_protected do
  match do
    expect(response.status).to eq 401
  end
end

RSpec::Matchers.define :return_token do
  match do
    header = response.headers['Authorization']

    expect(header).not_to be_nil
    expect(header).to match(/^Bearer/)

    token = JWT::Auth::Token.from_token header.split(' ').last

    expect(token).not_to be_nil
    expect(token).to be_valid
  end
end
