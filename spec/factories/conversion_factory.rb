# frozen_string_literal: true

FactoryGirl.define do
  factory :conversion do
    user { build :user }
    deck { build :deck }
    status { %i[queued processing success error].sample }
  end
end
