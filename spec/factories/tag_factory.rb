# frozen_string_literal: true
FactoryGirl.define do
  factory :tag do
    name { Faker::Lorem.words(2).join ' ' }

    trait :with_decks do
      decks { build_list :deck, 3 }
    end
  end
end
