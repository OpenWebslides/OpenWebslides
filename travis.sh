#!/bin/bash
#
# Travis build script
#

trap _error_handler ERR
function _error_handler() {
  echo -e "\e[1;31m=> Command `caller` exited unsuccessfully."
  exit 1
}

# Environment variables
export RAILS_ENV=test
export CI=true
export TRAVIS=true

# Setup test database
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:sample
bundle exec rspec
