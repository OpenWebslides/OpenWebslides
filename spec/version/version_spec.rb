# frozen_string_literal: true

require 'rails_helper'

RSpec.describe OpenWebslides::Version do
  describe 'methods' do
    it 'has methods' do
      expect(subject).to respond_to :app
      expect(subject).to respond_to :build
      expect(subject).to respond_to :version
      expect(subject).to respond_to :version_string

      expect(described_class).to respond_to :parse
    end
  end

  describe 'parse' do
    it 'raises on error' do
      expect(-> { described_class.parse '' }).to raise_error OpenWebslides::ArgumentError
    end

    it 'parses correctly' do
      v = described_class.parse 'Open Webslides/22 (foo/1.0.2; bar/2.9.1)'

      expect(v.app).to eq 'Open Webslides'
      expect(v.build).to eq '22'
      expect(v.version).to include :foo => '1.0.2', :bar => '2.9.1'
    end
  end
end
