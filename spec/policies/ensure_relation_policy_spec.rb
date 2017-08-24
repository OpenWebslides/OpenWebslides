# frozen_string_literal: true

require 'rails_helper'

##
# This script will iterate over all the relations in all of the models, and
# check if there is a policy action defined for both the relation
# (e.g. UserPolicy#show_decks?) and the inverse relation (e.g. DeckPolicy#show_owner?)
#

##
# Models without API interaction
#
MODEL_BLACKLIST = [
  Identity,
  Grant
].freeze

##
# Relations without API interaction
#
ACTION_BLACKLIST = {
  UserPolicy => %i[show_identities? show_grants? show_ratings?],
  DeckPolicy => %i[show_grants?],
  AnnotationPolicy => %i[show_ratings?],
  ConversationPolicy => %i[show_ratings?],
  CommentPolicy => %i[show_ratings?],
  RatingPolicy => %i[show_annotation? show_user?]
}.freeze

RSpec.describe 'relationship policy actions' do
  ApplicationRecord.descendants.each do |model|
    next if MODEL_BLACKLIST.include? model

    policy_class = "#{model}Policy".constantize

    model.reflect_on_all_associations.each do |relation|
      describe policy_class do
        let(:subject) { policy_class.new nil, nil }
        action = :"show_#{relation.name}?"

        unless ACTION_BLACKLIST.key?(policy_class) && ACTION_BLACKLIST[policy_class].include?(action)
          it { is_expected.to respond_to action }
        end
      end

      next unless relation.inverse_of && !MODEL_BLACKLIST.include?(relation.klass)

      inverse_policy_class = "#{relation.klass}Policy".constantize

      describe "#{inverse_policy_class} (inverse)" do
        let(:subject) { inverse_policy_class.new nil, nil }
        action = :"show_#{relation.inverse_of.name}?"

        unless ACTION_BLACKLIST.key?(inverse_policy_class) && ACTION_BLACKLIST[inverse_policy_class].include?(action)
          it { is_expected.to respond_to action }
        end
      end
    end
  end
end
