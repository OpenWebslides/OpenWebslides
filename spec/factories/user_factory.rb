# frozen_string_literal: true

FactoryGirl.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password 6 }
    password_confirmation { password }

    trait :with_decks do
      decks { build_list :deck, 3 }
    end

    trait :with_identities do
      identities { build_list :identity, 3 }
    end

    trait :with_conversions do
      conversions { build_list :conversion, 3 }
    end

    trait :confirmed do
      after :create, &:confirm
    end
  end
end
