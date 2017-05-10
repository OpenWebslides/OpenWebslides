# frozen_string_literal: true

FactoryGirl.define do
  factory :deck do
    name { Faker::Lorem.words(4).join ' ' }
    state :public_access
    owner { build :user }

    trait :with_collaborators do
      collaborators { build_list :user, 3 }
    end
  end
end
