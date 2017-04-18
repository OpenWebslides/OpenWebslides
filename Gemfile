# frozen_string_literal: true

source 'https://rubygems.org'

ruby '2.4.1'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Authentication/authorization
gem 'jwt'
gem 'jwt-auth'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-github'
gem 'omniauth-google-oauth2'

# Data store providers
gem 'net-ssh'
gem 'octokit'
gem 'rugged'

# Webpack for client-side assets
gem 'webpack-rails'

# JSON:API spec compliant resources
gem 'jsonapi-authorization', :github => 'handlers/jsonapi-authorization', :branch => 'jsonapi-resources-0.9'
gem 'jsonapi-resources'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'
# Use Puma as the application server
gem 'puma', '~> 3.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

# Tame Rails logging
gem 'lograge'
# Use Pundit for permission model
gem 'pundit'

group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', :platform => :mri

  # Enforce code style using Rubocop
  gem 'rubocop', :require => false

  # Check for vulnerable versions of gems
  gem 'bundler-audit', :require => false

  # Coverage report
  gem 'simplecov', :require => false

  # SCSS-lint rendering
  gem 'sass'
end

group :test do
  # BDD testing for Ruby
  gem 'rspec'
  gem 'rspec-rails'

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
end

gem 'foreman'
