# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User API', :type => :request do
  let(:user) { create :user, :confirmed }

  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }
  let(:password) { Faker::Internet.password 6 }

  let(:attributes) do
    {
      :email => Faker::Internet.email,
      :firstName => first_name,
      :password => password,
      :tosAccepted => true
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

  def update_body(id, attributes)
    {
      :data => {
        :type => 'users',
        :id => id,
        :attributes => attributes
      }
    }.to_json
  end

  describe 'GET /' do
    before do
      create_list :user, 3

      add_accept_header
    end

    it 'returns successful' do
      get users_path

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body
      expect(json['data'].count).to eq 3
    end
  end

  describe 'POST /' do
    before do
      add_content_type_header
      add_accept_header
    end

    it 'rejects an already existing email' do
      post users_path, :params => request_body(attributes.merge :email => user.email), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects TOS not accepted' do
      post users_path, :params => request_body(attributes.merge :tosAccepted => false), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects empty passwords' do
      post users_path, :params => request_body(attributes.merge :password => ''), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no first name' do
      post users_path, :params => request_body(attributes.except :firstName), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      post users_path, :params => request_body(attributes), :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body

      # Email is hidden for unauthenticated users
      expect(json['data']['attributes']).to match 'firstName' => attributes[:firstName]
    end
  end

  describe 'GET /:id' do
    before do
      add_accept_header
    end

    it 'rejects an invalid id' do
      get user_path(:id => 0), :headers => headers

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      get user_path(:id => user.id), :headers => headers

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end
  end

  describe 'PUT/PATCH /:id' do
    before do
      add_content_type_header
      add_accept_header
      add_auth_header
    end

    it 'rejects id not equal to URL' do
      patch user_path(:id => user.id), :params => update_body(999, :firstName => 'foo'), :headers => headers

      expect(response.status).to eq 400
      expect(jsonapi_error_code(response)).to eq JSONAPI::KEY_NOT_INCLUDED_IN_URL
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects non-existant users' do
      patch user_path(:id => 999), :params => update_body(999, :firstName => 'foo'), :headers => headers

      expect(response.status).to eq 404
      expect(jsonapi_error_code(response)).to eq JSONAPI::RECORD_NOT_FOUND
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects email changes' do
      patch user_path(:id => user.id), :params => update_body(user.id, :email => user.email), :headers => headers

      expect(response.status).to eq 400
      expect(jsonapi_error_code(response)).to eq JSONAPI::PARAM_NOT_ALLOWED
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects empty passwords' do
      patch user_path(:id => user.id), :params => update_body(user.id, :password => ''), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'updates firstName' do
      expect(user.first_name).not_to eq first_name
      patch user_path(:id => user.id), :params => update_body(user.id, :firstName => first_name), :headers => headers

      user.reload
      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(user.first_name).to eq first_name
    end

    it 'updates lastName' do
      expect(user.last_name).not_to eq last_name
      patch user_path(:id => user.id), :params => update_body(user.id, :lastName => last_name), :headers => headers

      user.reload
      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(user.last_name).to eq last_name
    end

    it 'updates password' do
      expect(user.valid_password? password).not_to be true
      patch user_path(:id => user.id), :params => update_body(user.id, :password => password), :headers => headers

      user.reload
      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      expect(user.valid_password? password).to be true
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
    end

    it 'rejects non-existant users' do
      delete user_path(:id => '0'), :params => user_path(:id => 999), :headers => headers

      user.reload
      expect(user).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes a user' do
      id = user.id
      delete user_path(:id => user.id), :params => user_path(:id => user.id), :headers => headers

      expect(-> { User.find id }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end

  describe 'decks relationship' do
    describe 'GET /relationships/decks' do
      before do
        add_accept_header
        add_auth_header

        create :deck, :owner => user
      end

      it 'returns successful' do
        get user_relationships_decks_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq Deck.where(:owner => user).count
        expect(json['data'].first['type']).to eq 'decks'
      end
    end

    describe 'related resources do' do
      before do
        add_accept_header
        add_auth_header

        user.decks << create(:deck)
      end

      it 'returns successful' do
        get user_decks_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq user.decks.count
        expect(json['data'].first['type']).to eq 'decks'
      end
    end

    # TODO: POST /relationships/decks
    # TODO: PATCH /relationships/decks
    # TODO: DELETE /relationships/decks
  end

  describe 'collaborations relationship' do
    describe 'GET /relationships/collaborations' do
      before do
        add_accept_header
        add_auth_header

        deck = create :deck
        deck.collaborators << user
      end

      it 'returns successful' do
        get user_relationships_collaborations_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq 1
        expect(json['data'].first['type']).to eq 'decks'
      end
    end

    describe 'related resources do' do
      before do
        add_accept_header
        add_auth_header

        user.collaborations << create(:deck)
      end

      it 'returns successful' do
        get user_collaborations_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq user.collaborations.count
        expect(json['data'].first['type']).to eq 'decks'
      end
    end

    # TODO: POST /relationships/collaborations
    # TODO: PATCH /relationships/collaborations
    # TODO: DELETE /relationships/collaborations
  end

  describe 'conversions relationship' do
    describe 'GET /relationships/conversions' do
      before do
        add_accept_header
        add_auth_header

        create :conversion, :user => user
      end

      it 'returns successful' do
        get user_relationships_conversions_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq 1
        expect(json['data'].first['type']).to eq 'conversions'
      end
    end

    describe 'related resources do' do
      before do
        add_accept_header
        add_auth_header

        user.conversions << create(:conversion)
      end

      it 'returns successful' do
        get user_conversions_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq user.conversions.count
        expect(json['data'].first['type']).to eq 'conversions'
      end
    end

    # TODO: POST /relationships/conversions
    # TODO: PATCH /relationships/conversions
    # TODO: DELETE /relationships/conversions
  end
end
