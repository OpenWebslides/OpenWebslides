# frozen_string_literal: true

require 'database_cleaner'

RSpec.configure do |config|
  # before the entire test suite runs, clear the test database out completely
  config.before(:suite) do
    DatabaseCleaner.clean
  end

  # Default strategy is transaction (very fast)
  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each) do
    DatabaseCleaner.start
  end
  config.after(:each) do
    DatabaseCleaner.clean
  end
end
