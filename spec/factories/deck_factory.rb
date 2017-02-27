# frozen_string_literal: true
FactoryGirl.define do
  factory :deck do
    name { Faker::Lorem.words(4) }
    upstream { Faker::Internet.url }
    state :public_access

    trait :with_owner do
      owner { build :user }
    end
  end
end
