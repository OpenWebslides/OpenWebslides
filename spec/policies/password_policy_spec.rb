# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PasswordPolicy do
  subject { described_class.new nil, nil }

  it { is_expected.to permit_action :create }
  it { is_expected.to permit_action :update }
end
