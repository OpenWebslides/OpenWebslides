# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Deck API', :type => :request do
  let(:name) { Faker::Lorem.words(4).join(' ') }

  let(:user) { create :user, :confirmed }
  let(:deck) { create :deck, :owner => user }

  let(:attributes) do
    {
      :name => name,
      :state => %i[public_access protected_access private_access].sample,
      :description => Faker::Lorem.words(20).join(' '),
      :template => 'foo'
    }
  end

  def request_body(attributes)
    {
      :data => {
        :type => 'decks',
        :attributes => attributes,
        :relationships => {
          :owner => {
            :data => {
              :id => user.id,
              :type => 'users'
            }
          }
        }
      }
    }.to_json
  end

  def update_body(id, attributes)
    {
      :data => {
        :type => 'decks',
        :id => id,
        :attributes => attributes
      }
    }.to_json
  end


  describe 'GET /' do
    before do
      create_list :deck, 3

      add_accept_header
    end

    it 'returns successful' do
      get api_decks_path

      expect(response.status).to eq 200
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body
      expect(json['data'].count).to eq 3
    end
  end

  describe 'POST /' do
    before do
      add_content_type_header
      add_auth_header
    end

    it 'rejects empty name' do
      post api_decks_path, :params => request_body(attributes.merge :name => ''), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects no name' do
      post api_decks_path, :params => request_body(attributes.except :name), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects empty state' do
      post api_decks_path, :params => request_body(attributes.merge :state => ''), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'rejects invalid state' do
      post api_decks_path, :params => request_body(attributes.merge :state => 'foo'), :headers => headers

      expect(response.status).to eq 422
      expect(jsonapi_error_code(response)).to eq [JSONAPI::VALIDATION_ERROR, JSONAPI::VALIDATION_ERROR]
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'returns successful' do
      post api_decks_path, :params => request_body(attributes), :headers => headers

      expect(response.status).to eq 201
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE

      json = JSON.parse response.body

      expect(json['data']['attributes']['name']).to eq attributes[:name]
    end
  end

  describe 'GET /:id' do
    context 'JSON' do
      before do
        add_accept_header
      end

      it 'rejects an invalid id' do
        get api_deck_path(:id => 0), :headers => headers

        expect(response.status).to eq 404
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'returns successful' do
        get api_deck_path(:id => deck.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end
    end

    context 'HTML' do
      before do
        (@headers ||= {})['Accept'] = 'text/html'
      end

      it 'rejects an invalid id' do
        get api_deck_path(:id => 0), :headers => headers

        expect(response.status).to eq 404
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'returns successful' do
        get api_deck_path(:id => deck.id), :headers => headers

        expect(response.status).to eq 200
        expect(response.content_type).to eq 'text/html'
      end
    end
  end

  describe 'PUT/PATCH /:id' do
    context 'JSON' do
      before do
        add_content_type_header
        add_accept_header
        add_auth_header
      end

      it 'rejects id not equal to URL' do
        patch api_deck_path(:id => deck.id), :params => update_body(999, :name => 'foo'), :headers => headers

        expect(response.status).to eq 400
        expect(jsonapi_error_code(response)).to eq JSONAPI::KEY_NOT_INCLUDED_IN_URL
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'rejects non-existant decks' do
        patch api_deck_path(:id => 999), :params => update_body(999, :name => 'foo'), :headers => headers

        expect(response.status).to eq 404
        expect(jsonapi_error_code(response)).to eq JSONAPI::RECORD_NOT_FOUND
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'rejects empty name' do
        patch api_deck_path(:id => deck.id), :params => update_body(deck.id, :name => ''), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'rejects invalid state' do
        patch api_deck_path(:id => deck.id), :params => update_body(deck.id, attributes.merge(:state => 'foo')), :headers => headers

        expect(response.status).to eq 422
        expect(jsonapi_error_code(response)).to eq JSONAPI::VALIDATION_ERROR
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
      end

      it 'updates name' do
        expect(deck.name).not_to eq name
        patch api_deck_path(:id => deck.id), :params => update_body(deck.id, :name => name), :headers => headers

        deck.reload
        expect(response.status).to eq 200
        expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
        expect(deck.name).to eq name
      end
    end

    context 'HTML' do
      before do
        add_auth_header
        @headers['Content-Type'] = 'text/html'
      end

      it 'updates html' do
        patch api_deck_path(:id => deck.id), :params => '<html></html>', :headers => headers

        expect(response.status).to eq 204
      end
    end
  end

  describe 'DELETE /:id' do
    before do
      add_auth_header
    end

    it 'rejects non-existant users' do
      delete api_deck_path(:id => '0'), :params => api_deck_path(:id => 999), :headers => headers

      deck.reload
      expect(deck).not_to be_destroyed

      expect(response.status).to eq 404
      expect(response.content_type).to eq JSONAPI::MEDIA_TYPE
    end

    it 'deletes a deck' do
      id = deck.id
      delete api_deck_path(:id => deck.id), :params => api_deck_path(:id => deck.id), :headers => headers

      expect(-> { Deck.find id }).to raise_error ActiveRecord::RecordNotFound

      expect(response.status).to eq 204
    end
  end

  # TODO: owner relationship
  # TODO: collaborators relationship
  # TODO: conversion relationship
  # TODO: assets relationship
end
