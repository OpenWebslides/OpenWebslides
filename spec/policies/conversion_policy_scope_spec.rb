# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversionPolicy::Scope do
  subject { described_class.new(user, Conversion).resolve.count }

  let(:conversion) { create :conversion }

  context 'for everyone' do
    let(:user) { nil }

    it { is_expected.to eq 0 }
  end

  context 'for a user' do
    let(:user) { conversion.user }

    it { is_expected.to eq 1 }
  end
end
