# Open Webslides [![Travis](https://travis-ci.org/OpenWebslides/OpenWebslides.svg?branch=master)](https://travis-ci.org/OpenWebslides/OpenWebslides) [![Coverage Status](https://coveralls.io/repos/github/OpenWebslides/OpenWebslides/badge.svg)](https://coveralls.io/github/OpenWebslides/OpenWebslides)

[Open Webslides](https://openwebslides.github.io) is an open-source co-creation platform.

## Getting started

Install the following software first:

- RVM
- Ruby 2.4.0
- Yarn
- NodeJS 7.6.0

Then install all dependencies:

```
$ # Back-end dependencies
$ gem install bundler --no-ri --no-rdoc
$ bundle install

$ # Front-end dependencies
$ yarn install
```

Enable git pre-commit hooks:

```
$ bundle exec overcommit --install
```

When the overcommit configuration changes (and on the first run), you have to verify it:

```
$ bundle exec overcommit --sign
```

## Development

Use Foreman to start both the Rails server and the Webpack server:

```
$ bundle exec rails db:migrate
$ bundle exec foreman start
```

Use RuboCop to enforce code conventions:

```
$ bundle exec rubocop --rails
```

Use RSpec to run tests:

```
$ bundle exec rails db:drop RAILS_ENV=test
$ bundle exec rails db:create RAILS_ENV=test
$ bundle exec rails db:migrate RAILS_ENV=test
$ bundle exec rspec
```

If you want to fill the development database with sample data:

```
$ bundle exec rails db:drop RAILS_ENV=development
$ bundle exec rails db:create RAILS_ENV=development
$ bundle exec rails db:migrate RAILS_ENV=development
$ bundle exec rails db:sample RAILS_ENV=development
```

## Documentation

Generate API documentation:

```
bundle exec rails documentation:generate
```
