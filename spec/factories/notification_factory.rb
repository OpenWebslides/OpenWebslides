# frozen_string_literal: true

FactoryGirl.define do
  factory :notification do
    event_type { Notification.event_types.keys.sample }
    user { build :user }
    deck { build :deck }
  end
end
