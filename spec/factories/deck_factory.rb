# frozen_string_literal: true

FactoryGirl.define do
  factory :deck do
    name { Faker::Lorem.words(4).join ' ' }
    state :public_access
    owner { build :user }

    trait :with_tags do
      tags { build_list :tag, 3 }
    end

    trait :with_contributors do
      contributors { build_list :user, 3 }
    end
  end
end
