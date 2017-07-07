# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversionPolicy do
  subject { described_class.new user, record }

  let(:record) { build :conversion }

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to forbid_action :index }
    it { is_expected.to forbid_action :create }
    it { is_expected.to forbid_action :show }
    it { is_expected.to forbid_action :show_user }
    it { is_expected.to forbid_action :show_deck }
  end

  context 'for a user' do
    let(:user) { record.user }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to permit_action :show_user }
    it { is_expected.to permit_action :show_deck }
  end

  context 'for another user' do
    let(:user) { build :user }

    it { is_expected.to permit_action :index }
    it { is_expected.to forbid_action :create }
    it { is_expected.to forbid_action :show }
    it { is_expected.to forbid_action :show_user }
    it { is_expected.to forbid_action :show_deck }
  end
end
