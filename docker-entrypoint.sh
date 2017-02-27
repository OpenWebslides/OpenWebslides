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

cd /app

# Start app server
bundle exec puma -b unix:///app/tmp/sockets/puma.sock
