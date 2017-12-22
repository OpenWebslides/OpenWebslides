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

        create :deck, :user => user
      end

      it 'returns successful' do
        get user_relationships_decks_path(:user_id => user.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

        json = JSON.parse response.body
        expect(json['data'].count).to eq Deck.where(:user => user).count
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
