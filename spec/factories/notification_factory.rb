# frozen_string_literal: true

FactoryGirl.define do
  factory :notification do
    predicate { Notification.predicates.keys.sample }
    subject { build :user }
    item { build :deck }
  end
end
