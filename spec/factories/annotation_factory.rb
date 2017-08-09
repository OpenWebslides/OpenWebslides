# frozen_string_literal: true

FactoryGirl.define do
  factory :annotation, :class => Annotations::Annotation do
    content_item_id { Faker::Number.number 2 }
    user { build :user }
    deck { build :deck }
  end
end
