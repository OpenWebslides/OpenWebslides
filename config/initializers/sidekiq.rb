# frozen_string_literal: true

# Perform Sidekiq jobs immediately in development,
# so you don't have to run a separate process.
# You'll also benefit from code reloading.
unless Rails.env.production?
  require 'sidekiq/testing'
  Sidekiq::Testing.inline!
end
