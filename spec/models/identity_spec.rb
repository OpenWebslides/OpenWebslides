# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Identity, :type => :model do
  it 'is valid with attributes' do
    expect(build :identity, :with_user).to be_valid
  end

  it 'is invalid without attributes' do
    expect(Identity.new).not_to be_valid
    expect(Identity.new :uid => 'foo').not_to be_valid
    expect(Identity.new :provider => 'foo').not_to be_valid
  end
end
