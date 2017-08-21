# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentService do
  let(:annotation) { create :comment, :text => 'foo' }

  let(:subject) { described_class.new annotation }

  describe 'delete' do
    describe 'public' do
      it 'is censored if public' do
        expect(annotation).to receive :hide
        expect(annotation.text).to eq 'foo'

        subject.delete

        expect(annotation.text).to eq I18n.t 'openwebslides.annotations.hidden'
      end
    end

    describe 'public' do
      before { annotation.protect }

      it 'is destroyed if private' do
        expect(annotation).to receive :destroy
        subject.delete
      end
    end
  end
end
