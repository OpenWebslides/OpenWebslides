# frozen_string_literal: true
FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { Faker::Internet.password 6 }
    provider 'email'
    uid { email }

    trait :with_decks do
      decks { build_list :deck, 3 }
    end
  end
end
