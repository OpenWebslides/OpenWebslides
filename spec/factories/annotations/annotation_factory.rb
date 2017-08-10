# frozen_string_literal: true

FactoryGirl.define do
  factory :annotation, :class => Annotations::Annotation do
    content_item_id { Faker::Number.number 2 }
    user { build :user }
    deck { build :deck }

    factory :conversation, :class => Annotations::Conversation do
      comment_type { %i[question note].sample }
      text { Faker::Lorem.sentence(3) }
    end

    factory :comment, :class => Annotations::Comment do
      text { Faker::Lorem.sentence(3) }

      conversation do
        build :conversation, :deck => deck, :content_item_id => content_item_id
      end
    end
  end
end
