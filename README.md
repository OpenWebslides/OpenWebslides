# Open Webslides

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
