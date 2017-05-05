# frozen_string_literal: true

require 'rails_helper'

include RequestsHelper

RSpec.describe 'User API', :type => :request do
  let(:user) { create :user, :confirmed }
  let(:attributes) do
    {
      :email => Faker::Internet.email,
      :firstName => Faker::Name.first_name,
      :password => Faker::Internet.password(6)
    }
  end

  def request_body(attributes)
    {
      :data => {
        :type => 'users',
        :attributes => attributes
      }
    }.to_json
  end

  def update_body(user)
    {
      :data => {
        :id => user.id,
        :attributes => {

        }
      }
    }
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
    end

    it 'rejects empty passwords' do
      post_unauthenticated api_users_path, request_body(attributes.merge :password => '')

      expect(response.status).to eq 422
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
    it 'rejects invalid parameters' do
      post_authenticated api_user_path(:id => user.id), request_body(attributes.merge :email => user.email)
    end

    it 'rejects non-existant users' do end

    it 'rejects empty passwords' do end

    it 'updates a user' do end
  end

  describe 'delete a user' do
    it 'rejects non-existant users' do end

    it 'deletes a user' do end
  end
end
