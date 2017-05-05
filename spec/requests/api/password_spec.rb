# frozen_string_literal: true

require 'rails_helper'

include RequestsHelper

RSpec.describe 'Password API', :type => :request do
  let(:unconfirmed_user) { create :user, :password => password }
  let(:user) { create :user, :confirmed, :password => password }
  let(:password) { Faker::Internet.password 6 }
  let(:new_password) { Faker::Internet.password 6 }

  def request_body(email)
    {
      :data => {
        :type => 'passwords',
        :attributes => {
          :email => email
        }
      }
    }.to_json
  end

  def reset_body(token, password)
    {
      :data => {
        :type => 'passwords',
        :id => '',
        :attributes => {
          :resetPasswordToken => token,
          :password => password
        }
      }
    }.to_json
  end

  describe 'request a password reset' do
    it 'accepts unconfirmed users' do
      post_unauthenticated api_password_path, request_body(unconfirmed_user.email)

      expect(response.status).to eq 204
    end

    it 'accepts invalid emails' do
      post_unauthenticated api_password_path, request_body('foo')

      expect(response.status).to eq 204
    end

    it 'requests a password reset token' do
      post_unauthenticated api_password_path, request_body(user.email)

      expect(response.status).to eq 204
    end
  end

  describe 'reset a password' do
    it 'rejects invalid reset password tokens' do
      expect(user.valid_password? password).to eql true
      user.send_reset_password_instructions

      new_password = Faker::Internet.password 6
      expect(password).not_to eql new_password

      patch_unauthenticated api_password_path, reset_body('foo', new_password)

      expect(response.status).to eq 400
    end

    it 'resets a password' do
      expect(user.valid_password? password).to eql true
      token = user.send_reset_password_instructions

      expect(password).not_to eql new_password

      patch_unauthenticated api_password_path, reset_body(token, new_password)

      expect(response.status).to eq 200

      user.reload
      expect(user.valid_password? new_password).to eql true
    end

    it 'resets a password for unconfirmed users' do
      expect(unconfirmed_user.valid_password? password).to eql true
      expect(unconfirmed_user).not_to be_confirmed
      token = unconfirmed_user.send_reset_password_instructions

      expect(password).not_to eql new_password

      patch_unauthenticated api_password_path, reset_body(token, new_password)

      expect(response.status).to eq 200

      unconfirmed_user.reload
      expect(unconfirmed_user.valid_password? new_password).to eql true
      expect(unconfirmed_user).not_to be_confirmed
    end
  end
end
