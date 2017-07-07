# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConversionPolicy::Scope do
  subject { described_class.new(user, Conversion).resolve }

  include_context 'policy_sample'

  context 'for everyone' do
    let(:user) { nil }

    it { is_expected.to be_empty }
  end

  context 'for a user' do
    let(:conversion) { build :conversion }
    let(:user) { conversion.user }

    it { is_expected.to eq Conversion.where(:user => user) }
  end
end
