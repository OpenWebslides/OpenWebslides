# frozen_string_literal: true

namespace :db do
  desc 'Prepare test database (drop, load schema, migrate, sample)'
  task :prepare => :environment do
    Rails.env ||= ENV['RAILS_ENV'] ||= 'development'

    # Drop and recreate database
    Rake::Task['db:drop'].invoke
    Rake::Task['db:create'].invoke
    Rake::Task['db:schema:load'].invoke

    # Populate database with sample data
    Rake::Task['db:sample'].invoke

    # Apply migrations if necessary
    Rake::Task['db:migrate'].invoke
  end
end
