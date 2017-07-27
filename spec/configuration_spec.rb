# frozen_string_literal: true

require 'rails_helper'
require 'ostruct'

RSpec.describe OpenWebslides do
  it 'has a configuration' do
    expect(OpenWebslides).to respond_to :config
    expect(OpenWebslides.config).to be_instance_of OpenStruct
  end

  it 'has top-level configuration keys' do
    subject { OpenWebslides.config }

    expect(subject.config).to respond_to :repository_path
    expect(subject.config.repository_path).to be_a String

    expect(subject.config).to respond_to :template_path
    expect(subject.config.template_path).to be_a String

    expect(subject.config).to respond_to :default_template
    expect(subject.config.default_template).to be_a String
  end

  it 'has OAuth2 configuration' do
    expect(subject.config).to respond_to :oauth2
    expect(subject.config.oauth2).to be_an OpenStruct

    expect(subject.config.oauth2).to respond_to :github_id
    expect(subject.config.oauth2).to respond_to :github_secret
    expect(subject.config.oauth2).to respond_to :google_id
    expect(subject.config.oauth2).to respond_to :google_secret
    expect(subject.config.oauth2).to respond_to :facebook_id
    expect(subject.config.oauth2).to respond_to :facebook_secret
  end

  it 'has API configuration' do
    expect(subject.config).to respond_to :api
    expect(subject.config.api).to be_an OpenStruct

    expect(subject.config.api).to respond_to :token_lifetime
    expect(subject.config.api.token_lifetime).to be_an Integer
  end

  it 'has GitHub configuration' do
    expect(subject.config).to respond_to :github
    expect(subject.config.github).to be_an OpenStruct

    expect(subject.config.github).to respond_to :enabled
    expect(subject.config.github.enabled).to be_in [true, false]

    expect(subject.config.github).to respond_to :host
    expect(subject.config.github.host).to be_a String

    expect(subject.config.github).to respond_to :ssh_user
    expect(subject.config.github.ssh_user).to be_a String

    expect(subject.config.github).to respond_to :organization

    expect(subject.config.github).to respond_to :private_key
    expect(subject.config.github.private_key).to be_a String

    expect(subject.config.github).to respond_to :github_user
    expect(subject.config.github).to respond_to :github_passphrase

    expect(subject.config.github).to respond_to :github_api
    expect(subject.config.github.github_api).to be_a String
  end
end
