# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Annotations::Annotation, :type => :model do
  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:content_item_id) }
    it { is_expected.not_to allow_value('').for(:content_item_id) }
  end

  describe 'attributes' do
    it { is_expected.not_to allow_value(nil).for(:state) }
    it { is_expected.not_to allow_value('').for(:state) }
  end

  describe 'associations' do
    it { is_expected.to belong_to(:user).inverse_of(:annotations) }
    it { is_expected.to belong_to(:deck).inverse_of(:annotations) }

    it { is_expected.to have_many(:ratings).dependent(:destroy).inverse_of(:annotation) }
  end

  describe 'state machine' do
    let(:subject) { build :annotation }

    it { is_expected.to have_states :created, :secret, :edited, :flagged, :hidden }

    context 'created' do
      it { is_expected.to handle_events :edit, :protect, :flag, :hide, :when => :created }
      it { is_expected.to reject_events :publish, :when => :created }

      it { is_expected.to transition_from :created, :to_state => :edited, :on_event => :edit }
      it { is_expected.to transition_from :created, :to_state => :secret, :on_event => :protect }
      it { is_expected.to transition_from :created, :to_state => :flagged, :on_event => :flag }
      it { is_expected.to transition_from :created, :to_state => :hidden, :on_event => :hide }
    end

    context 'edited' do
      it { is_expected.to handle_events :edit, :flag, :hide, :when => :edited }
      it { is_expected.to reject_events :protect, :publish, :when => :edited }

      it { is_expected.to transition_from :edited, :to_state => :edited, :on_event => :edit }
      it { is_expected.to transition_from :edited, :to_state => :flagged, :on_event => :flag }
      it { is_expected.to transition_from :edited, :to_state => :hidden, :on_event => :hide }
    end

    context 'secret' do
      it { is_expected.to handle_events :edit, :publish, :when => :secret }
      it { is_expected.to reject_events :protect, :flag, :hide, :when => :secret }

      it { is_expected.to transition_from :secret, :to_state => :secret, :on_event => :edit }
      it { is_expected.to transition_from :secret, :to_state => :created, :on_event => :publish }
    end

    context 'flagged' do
      it { is_expected.to handle_events :hide, :when => :flagged }
      it { is_expected.to reject_events :edit, :protect, :publish, :flag, :when => :flagged }

      it { is_expected.to transition_from :flagged, :to_state => :hidden, :on_event => :hide }
    end

    context 'hidden' do
      it { is_expected.to reject_events :hide, :edit, :protect, :publish, :flag, :when => :hidden }
    end
  end
end
