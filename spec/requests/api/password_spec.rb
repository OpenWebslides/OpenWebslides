# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Password API', :type => :request do
  let(:password) { Faker::Internet.password 6 }
  let(:new_password) { Faker::Internet.password 6 }

  let(:unconfirmed_user) { create :user, :password => password }
  let(:user) { create :user, :confirmed, :password => password }

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

  describe 'POST /' do
    before do
      add_content_type_header
    end

    it 'accepts unconfirmed users' do
      post api_password_path, :params => request_body(unconfirmed_user.email), :headers => headers

      expect(response.status).to eq 204
    end

    it 'accepts invalid emails' do
      post api_password_path, :params => request_body('foo'), :headers => headers

      expect(response.status).to eq 204
    end

    it 'requests a password reset token' do
      post api_password_path, :params => request_body(user.email), :headers => headers

      expect(response.status).to eq 204
    end
  end

  describe 'PUT/PATCH /' do
    before do
      add_content_type_header
      add_accept_header
    end

    it 'rejects invalid reset password tokens' do
      expect(user.valid_password? password).to eql true
      user.send_reset_password_instructions

      new_password = Faker::Internet.password 6
      expect(password).not_to eql new_password

      patch api_password_path, :params => reset_body('foo', new_password), :headers => headers

      expect(response.status).to eq 422
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'resets a password' do
      expect(user.valid_password? password).to eql true
      token = user.send_reset_password_instructions

      expect(password).not_to eql new_password

      patch api_password_path, :params => reset_body(token, new_password), :headers => headers

      expect(response.status).to eq 200

      user.reload
      expect(user.valid_password? new_password).to eql true
    end

    it 'resets a password for unconfirmed users' do
      expect(unconfirmed_user.valid_password? password).to eql true
      expect(unconfirmed_user).not_to be_confirmed
      token = unconfirmed_user.send_reset_password_instructions

      expect(password).not_to eql new_password

      patch api_password_path, :params => reset_body(token, new_password), :headers => headers

      expect(response.status).to eq 200

      unconfirmed_user.reload
      expect(unconfirmed_user.valid_password? new_password).to eql true
      expect(unconfirmed_user).not_to be_confirmed
    end
  end
end
