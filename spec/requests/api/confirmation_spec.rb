# frozen_string_literal: true

require 'rails_helper'

include RequestsHelper

RSpec.describe 'Confirmation API', :type => :request do
  let(:user) { create :user }

  def body(token)
    {
      :data => {
        :type => 'confirmations',
        :attributes => {
          :confirmationToken => token
        }
      }
    }
  end

  it 'rejects invalid confirmation tokens' do
    post_with_headers '/api/confirmation', body('foo').to_json

    expect(response.status).to eql 400
  end

  it 'confirm a user' do
    expect(user.confirmed?).not_to be true

    post_with_headers '/api/confirmation', body(user.confirmation_token).to_json

    expect(response.status).to eql 201

    user.reload
    expect(user.confirmed?).to be true
  end
end
