# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ConfirmationPolicy do
  subject { described_class.new nil, nil }

  it { is_expected.to permit_action :create }
end
