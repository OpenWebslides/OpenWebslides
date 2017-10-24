# frozen_string_literal: true

source 'https://rubygems.org'

ruby '>= 2.3.3'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# State Machine
gem 'state_machines'
gem 'state_machines-activerecord'

# Authentication
gem 'devise'
gem 'jwt'
gem 'jwt-auth'
gem 'omniauth'
gem 'omniauth-cas'

# Authorization
gem 'pundit'

# Data store providers
gem 'net-ssh'
gem 'octokit'
gem 'rugged'

# JSON:API spec compliant resources
gem 'jsonapi-utils'

# HTML5 parser
gem 'nokogumbo'

# Asynchronous processing
gem 'sidekiq'

# Filename sanitization
gem 'zaru'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails'
# Use Puma as the application server
gem 'puma'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'
# Use ActiveModel has_secure_password
gem 'bcrypt'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors'

# Tame Rails logging
gem 'lograge'

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'

  # Enforce code style using Rubocop
  gem 'rubocop', :require => false

  # Check for vulnerable versions of gems
  gem 'bundler-audit', :require => false

  # Coverage report
  gem 'coveralls', :require => false
  gem 'simplecov', :require => false

  # SCSS-lint rendering
  gem 'sass', :require => false

  # Process manager
  gem 'foreman', :require => false

  # Detect code smells
  gem 'reek', :require => false
end

group :test do
  # BDD testing for Ruby
  gem 'rspec'
  gem 'rspec-rails'

  # Rails RSpec matchers
  gem 'shoulda-matchers', :git => 'https://github.com/thoughtbot/shoulda-matchers.git', :branch => 'rails-5'

  # State machine RSpec matchers
  gem 'state_machines-rspec'

  # Pundit RSpec matchers
  gem 'pundit-matchers'

  # JSONAPI RSpec matchers
  gem 'jsonapi-resources-matchers'

  # Factory pattern for testing
  gem 'factory_girl'
  gem 'factory_girl_rails'

  # Fake data generator
  gem 'faker'

  # Reset database
  gem 'database_cleaner'
end

group :development do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', :platform => :mri

  # Debugger
  gem 'debase', '~> 0.2.1'

  # Notify of file changes
  gem 'listen'

  # Git pre-commit hooks
  gem 'overcommit', :require => false

  # Analyze potential speed improvements
  gem 'fasterer', :require => false

  # Check for valid JSON syntax
  gem 'json', :require => false

  # Security vulnerability scanner
  gem 'brakeman', :require => false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', :platforms => %i[mingw mswin x64_mingw jruby]

group :production do
  # Use PostgreSQL as database
  gem 'pg'

  # Notify ops team of exceptions
  gem 'exception_notification'
  gem 'slack-notifier'
end
