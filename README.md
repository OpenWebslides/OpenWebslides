# Open Webslides ![Travis](https://travis-ci.org/OpenWebslides/OpenWebslides.svg?branch=master)

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
$ overcommit --install
```

When the overcommit configuration changes (and on the first run), you have to verify it:

```
$ overcommmit --sign
```

## Development

Use Foreman to start both the Rails server and the Webpack server:

```
$ rails db:migrate
$ foreman start
```

Use RuboCop to enforce code conventions:

```
$ rubocop --rails
```

Use RSpec to run tests

```
$ rails db:migrate RAILS_ENV=test
$ rake rspec
```

Use RSpec acceptance tests to write documentation

```
$ rails docs:generate
```

If you want to populate the database with sample data

```
$ rake db:populate
```
