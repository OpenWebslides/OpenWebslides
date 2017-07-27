# frozen_string_literal: true

FactoryGirl.define do
  factory :asset do
    filename { Faker::File.file_name }

    trait :with_deck do
      deck { build :deck }
    end
  end
end
