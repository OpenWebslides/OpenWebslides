# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy do
  subject { described_class.new user, record }

  let(:record) { build :user }

  context 'for a guest' do
    let(:user) { nil }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to forbid_action :update }
    it { is_expected.to forbid_action :destroy }

    it { is_expected.to forbid_action :create_decks }
    it { is_expected.to permit_action :show_decks }
    it { is_expected.to forbid_action :update_decks }
    it { is_expected.to forbid_action :destroy_decks }

    it { is_expected.to forbid_action :create_collaborations }
    it { is_expected.to permit_action :show_collaborations }
    it { is_expected.to forbid_action :update_collaborations }
    it { is_expected.to forbid_action :destroy_collaborations }

    it { is_expected.to forbid_action :create_notifications }
    it { is_expected.to permit_action :show_notifications }
    it { is_expected.to forbid_action :update_notifications }
    it { is_expected.to forbid_action :destroy_notifications }

    it { is_expected.to forbid_action :create_conversions }
    it { is_expected.to forbid_action :show_conversions }
    it { is_expected.to forbid_action :update_conversions }
    it { is_expected.to forbid_action :destroy_conversions }

    it { is_expected.to permit_action :show_annotations }
  end

  context 'for a user' do
    let(:user) { build :user }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }
    it { is_expected.to permit_action :show }
    it { is_expected.to forbid_action :update }
    it { is_expected.to forbid_action :destroy }

    it { is_expected.to forbid_action :create_decks }
    it { is_expected.to permit_action :show_decks }
    it { is_expected.to forbid_action :update_decks }
    it { is_expected.to forbid_action :destroy_decks }

    it { is_expected.to forbid_action :create_collaborations }
    it { is_expected.to permit_action :show_collaborations }
    it { is_expected.to forbid_action :update_collaborations }
    it { is_expected.to forbid_action :destroy_collaborations }

    it { is_expected.to forbid_action :create_notifications }
    it { is_expected.to permit_action :show_notifications }
    it { is_expected.to forbid_action :update_notifications }
    it { is_expected.to forbid_action :destroy_notifications }

    it { is_expected.to forbid_action :create_conversions }
    it { is_expected.to forbid_action :show_conversions }
    it { is_expected.to forbid_action :update_conversions }
    it { is_expected.to forbid_action :destroy_conversions }

    it { is_expected.to permit_action :show_annotations }
  end

  context 'for the same user' do
    let(:user) { record }

    it { is_expected.to permit_action :index }
    it { is_expected.to permit_action :create }
    it { is_expected.to permit_action :update }
    it { is_expected.to permit_action :destroy }

    it { is_expected.to permit_action :create_decks }
    it { is_expected.to permit_action :show_decks }
    it { is_expected.to permit_action :update_decks }
    it { is_expected.to permit_action :destroy_decks }

    it { is_expected.to permit_action :create_collaborations }
    it { is_expected.to permit_action :show_collaborations }
    it { is_expected.to permit_action :update_collaborations }
    it { is_expected.to permit_action :destroy_collaborations }

    it { is_expected.to forbid_action :create_notifications }
    it { is_expected.to permit_action :show_notifications }
    it { is_expected.to forbid_action :update_notifications }
    it { is_expected.to forbid_action :destroy_notifications }

    it { is_expected.to forbid_action :create_conversions }
    it { is_expected.to permit_action :show_conversions }
    it { is_expected.to forbid_action :update_conversions }
    it { is_expected.to forbid_action :destroy_conversions }

    it { is_expected.to permit_action :show_annotations }
  end
end
