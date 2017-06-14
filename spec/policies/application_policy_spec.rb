# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationPolicy do
  subject { described_class.new user, foo }

  let(:user) { create :user }
  let(:foo) { 'foo' }

  it 'should not permit anything' do
    expect(-> { subject.index? }).to raise_error OpenWebslides::NotImplementedError
    expect(-> { subject.create? }).to raise_error OpenWebslides::NotImplementedError
    expect(-> { subject.update? }).to raise_error OpenWebslides::NotImplementedError
    expect(-> { subject.destroy? }).to raise_error OpenWebslides::NotImplementedError
  end
end
