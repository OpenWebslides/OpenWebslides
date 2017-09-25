# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationPolicy::Scope do
  subject { described_class.new(user, Notification).resolve.count }

  let(:owner) { create :user }

  before :each do
    d1 = create :deck
    d2 = create :deck, :owner => owner
    d3 = create :deck, :state => :protected_access
    d4 = create :deck, :state => :private_access
    d5 = create :deck, :state => :private_access, :owner => owner

    create :notification, :item => d1, :subject => d1.owner
    create :notification, :item => d2, :subject => d2.owner
    create :notification, :item => d3, :subject => d3.owner
    create :notification, :item => d4, :subject => d4.owner
    create :notification, :item => d5, :subject => d5.owner
  end

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to eq 2 }
  end

  context 'for a user' do
    let(:user) { create :user }

    it { is_expected.to eq 3 }
  end

  context 'for an owner' do
    let(:user) { owner }

    it { is_expected.to eq 4 }
  end
end
