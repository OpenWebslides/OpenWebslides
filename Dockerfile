FROM ruby:2.4.1-slim
MAINTAINER Rein Van Imschoot <rein.vanimschoot@ugent.be>

# Create user and group
RUN useradd openwebslides --create-home --home-dir /app/ --shell /bin/false

RUN apt-get update && apt-get install -qq -y --no-install-recommends \
      build-essential nodejs libpq-dev libsqlite3-dev cmake pkg-config git

ENV ROOT_PATH /app
RUN mkdir -p $ROOT_PATH
WORKDIR $ROOT_PATH

COPY Gemfile Gemfile.lock $ROOT_PATH/
RUN gem install bundler
RUN bundle install

COPY . $ROOT_PATH/

CMD /app/docker-entrypoint.sh
