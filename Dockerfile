FROM ruby:2.4.1-slim
MAINTAINER Rein Van Imschoot <rein.vanimschoot@ugent.be>

##
# Create user and group
#
RUN useradd openwebslides --create-home --home-dir /app/ --shell /bin/false

##
# Install package dependencies
#
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
      curl

# Node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

# Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo 'deb https://dl.yarnpkg.com/debian/ stable main' | tee /etc/apt/sources.list.d/yarn.list

# Install packages
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
    build-essential nodejs libpq-dev libsqlite3-dev cmake pkg-config git yarn

# Install JRE 8 from jessie-backports
RUN echo 'deb http://ftp.debian.org/debian jessie-backports main' | tee /etc/apt/sources.list.d/backports.list
RUN apt-get update && apt-get install -qq -y -t jessie-backports \
    openjdk-8-jre-headless

WORKDIR /app/
ENV RAILS_ENV production

##
# Install Ruby dependencies
#
COPY Gemfile Gemfile.lock /app/
RUN gem install bundler
RUN bundle install --deployment --without development test

##
# Install Node dependencies
#
COPY client/package.json client/yarn.lock /app/client/
RUN cd /app/client && yarn install --production=false

##
# Add application
#
COPY . /app/

##
# Install submodules
#
RUN git submodule init && git submodule update && rm -rf .git

##
# Build public assets
#
RUN cd /app/client && ./node_modules/.bin/webpack -p --config config/webpack.js

##
# Run application
#
CMD /app/docker-entrypoint.sh
