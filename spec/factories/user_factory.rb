# frozen_string_literal: true
FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    email { Faker::Internet.email }

    trait :with_decks do
      decks { build_list :deck, 3 }
    end

    trait :with_identities do
      identities { build_list :identity, 3 }
    end
  end
end
