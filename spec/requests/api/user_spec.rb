# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:attributes) do
    {
      :email => Faker::Internet.email,
      :firstName => Faker::Name.first_name,
      :password => Faker::Internet.password(6)
    }
  end

  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:password) { Faker::Internet.password 6 }

  def request_body(attributes)
    {
      :data => {
        :type => 'users',
        :attributes => attributes
      }
    }.to_json
  end

  def update_body(id, attributes)
    {
      :data => {
        :type => 'users',
        :id => id,
        :attributes => attributes
      }
    }.to_json
  end

  describe 'list of all users' do
    it 'returns a list of all users' do
      get_unauthenticated api_users_path

      expect(response.status).to eq 200
    end
  end

  describe 'create a new user' do
    it 'rejects an email already existing' do
      post_unauthenticated api_users_path, request_body(attributes.merge :email => user.email)

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'rejects empty passwords' do
      post_unauthenticated api_users_path, request_body(attributes.merge :password => '')

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'rejects no first name' do
      post_unauthenticated api_users_path, request_body(attributes.except :firstName)

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'creates a new user' do
      post_unauthenticated api_users_path, request_body(attributes)

      expect(response.status).to eq 201

      json = JSON.parse response.body
      expect(json).to include 'data'
      expect(json['data']).to include 'attributes'

      # Email is hidden for unauthenticated users
      hash = { 'firstName' => attributes[:firstName], 'lastName' => nil }
      expect(json['data']['attributes']).to match hash
    end
  end

  describe 'get a user' do
    it 'rejects non-existant users' do
      get_unauthenticated api_user_path :id => 999

      expect(response.status).to eq 404
    end

    it 'gets a user' do
      get_unauthenticated api_user_path :id => user.id

      expect(response.status).to eq 200

      json = JSON.parse response.body
      expect(json).to include 'data'
      expect(json['data']).to include 'attributes'

      # Email is hidden for unauthenticated users
      hash = { 'firstName' => user.first_name, 'lastName' => user.last_name }
      expect(json['data']['attributes']).to match hash
    end
  end

  describe 'update a user' do
    it 'rejects id not equal to URL' do
      patch_authenticated user, api_user_path(:id => user.id), update_body(999, :firstName => 'foo')

      expect(response.status).to eq 400
      expect(jsonapi_error_code(response)).to eq JSONAPI::KEY_NOT_INCLUDED_IN_URL
    end

    it 'rejects non-existant users' do
      patch_authenticated user, api_user_path(:id => 999), update_body(999, :firstName => 'foo')

      expect(response.status).to eq 404
      expect(jsonapi_error_code(response)).to eq JSONAPI::RECORD_NOT_FOUND
    end

    it 'rejects email changes' do
      patch_authenticated user, api_user_path(:id => user.id), update_body(user.id, :email => user.email)

      expect(response.status).to eq 400
      expect(jsonapi_error_code(response)).to eq JSONAPI::PARAM_NOT_ALLOWED
    end

    it 'rejects empty passwords' do
      patch_authenticated user, api_user_path(:id => user.id), update_body(user.id, :password => '')

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
    end

    it 'updates firstName' do
      expect(user.first_name).not_to eq first_name
      patch_authenticated user, api_user_path(:id => user.id), update_body(user.id, :firstName => first_name)

      user.reload
      expect(response.status).to eq 200
      expect(user.first_name).to eq first_name
    end

    it 'updates lastName' do
      expect(user.last_name).not_to eq last_name
      patch_authenticated user, api_user_path(:id => user.id), update_body(user.id, :lastName => last_name)

      user.reload
      expect(response.status).to eq 200
      expect(user.last_name).to eq last_name
    end

    it 'updates password' do
      expect(user.valid_password? password).not_to be true
      patch_authenticated user, api_user_path(:id => user.id), update_body(user.id, :password => password)

      user.reload
      expect(response.status).to eq 200
      expect(user.valid_password? password).to be true
    end
  end

  describe 'delete a user' do
    it 'rejects non-existant users' do
      delete_authenticated user, api_user_path(:id => 999)

      user.reload
      expect(user).not_to be_destroyed
    end

    it 'deletes a user' do
      id = user.id
      delete_authenticated user, api_user_path(:id => user.id)

      expect(-> { User.find id }).to raise_error ActiveRecord::RecordNotFound
    end
  end
end
