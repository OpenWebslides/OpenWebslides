# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationPolicy do
  subject { described_class.new user, foo }

  let(:user) { create :user }
  let(:foo) { 'foo' }

  it 'should not permit anything' do
    expect(subject).to forbid_action :index
    expect(subject).to forbid_action :create
    expect(subject).to forbid_action :update
    expect(subject).to forbid_action :destroy
  end
end
