# frozen_string_literal: true
FactoryGirl.define do
  factory :identity do
    uid { Faker::Internet.email }
    provider { Faker::Lorem.words 1 }

    trait :with_user do
      user { build :user }
    end
  end
end
