# frozen_string_literal: true

FactoryGirl.define do
  factory :asset do
    filename { Faker::File.file_name }
  end
end
