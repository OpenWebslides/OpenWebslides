# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NotificationPolicy::Scope do
  subject { described_class.new(user, Notification).resolve }

  include_context 'policy_sample'

  context 'for everyone' do
    let(:user) { nil }

    it { is_expected.to eq Notification.all }
  end
end
