# frozen_string_literal: true
require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class.new user, object }

  let(:object) { build :user }

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to forbid_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to forbid_action :update }
    it { is_expected.to forbid_action :destroy }
  end

  context 'for a user' do
    let(:user) { build :user }

    it { is_expected.to forbid_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to forbid_action :update }
    it { is_expected.to forbid_action :destroy }
  end

  context 'for the same user' do
    let(:user) { object }

    it { is_expected.to forbid_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to permit_action :update }
    it { is_expected.to permit_action :destroy }
  end
end
