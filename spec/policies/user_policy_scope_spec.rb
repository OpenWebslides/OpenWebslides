# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy::Scope do
  subject { described_class.new(user, User).resolve }

  context 'for everyone' do
    let(:user) { nil }

    it { is_expected.to eq User.all }
  end
end
