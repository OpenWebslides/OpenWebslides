# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationPolicy do
  subject { described_class.new user, record }

  let(:record) { build :notification }

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :show }
  end

  context 'for a user' do
    let(:user) { build :user }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :show }
  end
end
