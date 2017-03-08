# frozen_string_literal: true
FactoryGirl.define do
  factory :deck do
    name { Faker::Lorem.words(4).join ' ' }
    repository { Faker::Lorem.words(4).join '-' }
    state :public_access

    trait :with_owner do
      owner { build :user }
    end

    trait :with_tags do
      tags { build_list :tag, 3 }
    end
  end
end
