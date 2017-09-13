# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Confirmation API', :type => :request do
  let(:user) { create :user }

  def request_body(token)
    {
      :data => {
        :type => 'confirmations',
        :attributes => {
          :confirmationToken => token
        }
      }
    }.to_json
  end

  before do
    add_content_type_header
  end

  it 'rejects invalid confirmation tokens' do
    post confirmation_path, :params => request_body('foo'), :headers => headers

    expect(response.status).to eq 422
    expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
  end

  it 'confirm a user' do
    expect(user.confirmed?).not_to be true

    post confirmation_path, :params => request_body(user.confirmation_token), :headers => headers

    expect(response.status).to eq 201
    expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

    user.reload
    expect(user.confirmed?).to be true
  end
end
