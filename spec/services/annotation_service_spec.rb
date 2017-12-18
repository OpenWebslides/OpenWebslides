# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AnnotationService do
  let(:annotation) { create :annotation }

  let(:subject) { described_class.new annotation }

  describe 'create' do
    let(:annotation) { build :annotation }

    it 'persists' do
      subject.create
      expect(annotation).to be_persisted
    end

    it 'transitions to :created' do
      subject.create
      expect(annotation.state_name).to eq :created
    end
  end

  describe 'update' do
    it 'persists' do
      subject.update :user => create(:user)
      expect(annotation).to be_persisted
    end

    it 'transitions' do
      expect(annotation).to receive :edit
      subject.update :user => create(:user)
    end
  end

  describe 'protect' do
    it 'persists' do
      subject.protect
      expect(annotation).to be_persisted
    end

    it 'transitions' do
      expect(annotation).to receive :protect
      subject.protect
    end
  end

  describe 'unprotect' do
    it 'persists' do
      subject.unprotect
      expect(annotation).to be_persisted
    end

    it 'transitions' do
      expect(annotation).to receive :unprotect
      subject.unprotect
    end
  end

  describe 'flag' do
    it 'persists' do
      subject.flag
      expect(annotation).to be_persisted
    end

    it 'transitions' do
      expect(annotation).to receive :flag
      subject.flag
    end
  end

  describe 'delete' do
    describe 'public' do
      it 'transitions if public' do
        expect(annotation).to receive :hide
        subject.delete
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
