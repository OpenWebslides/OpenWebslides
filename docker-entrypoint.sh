#!/bin/bash
#
# docker-entrypoint.sh - Start server
#

# Correct permissions
chown -R openwebslides:openwebslides /app/

# Remove stale lock files
rm -f /app/tmp/pids/server.pid

# Run as regular user
su - openwebslides

# Migrate relational data
bundle exec rake db:migrate

# Override API URL on runtime
erb /app/client/config/config.js.erb > /app/client/dist/config.js

# Copy assets
mkdir -p /app/public/
rm -rf /app/public/*
cp -r /app/client/dist/* /app/public/

# Start app server
bundle exec puma
