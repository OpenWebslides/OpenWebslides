# frozen_string_literal: true

FactoryGirl.define do
  factory :asset do
    filename { Faker::File.file_name }
    deck { build :deck }
  end
end
