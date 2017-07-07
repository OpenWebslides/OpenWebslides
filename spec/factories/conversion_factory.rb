# frozen_string_literal: true

FactoryGirl.define do
  factory :conversion do
    filename { Faker::File.file_name }
    name { Faker::File.file_name '' }
    status { %i[queued processing success error].sample }

    user { build :user }
    deck { build :deck }
  end
end
