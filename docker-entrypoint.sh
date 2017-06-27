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

# Start app server
bundle exec puma
