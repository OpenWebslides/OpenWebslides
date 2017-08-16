# frozen_string_literal: true

require 'faker'
require 'factory_girl'

namespace :db do
  desc 'Clear all data from the database'
  task :clear => :environment do
    Rails.application.eager_load!

    ApplicationRecord.descendants.each(&:destroy_all)
  end
end
