# frozen_string_literal: true

FactoryGirl.define do
  factory :annotation, :class => Annotation do
    content_item_id { Faker::Number.number 2 }
    user { build :user }
    deck { build :deck }

    factory :conversation, :class => Conversation do
      conversation_type { %i[question note].sample }
      text { Faker::Lorem.sentence(3) }
    end

    factory :comment, :class => Comment do
      text { Faker::Lorem.sentence(3) }

      conversation do
        build :conversation, :deck => deck, :content_item_id => content_item_id
      end
    end
  end
end
