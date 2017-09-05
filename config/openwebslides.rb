# frozen_string_literal: true

require 'openwebslides/configuration'

##
# Open Webslides configuration
#
# This is the global platform configuration. This file allows administrators to configure the instance.
#
OpenWebslides.configure do |config|
  #########################################
  ##     Open Webslides configuration    ##
  #########################################

  ##
  # Absolute path to persistent repository storage
  #
  config.repository_path = Rails.root.join 'data'

  ##
  # Absolute path to template directory
  #
  config.template_path = Rails.root.join 'lib', 'assets', 'templates'

  ##
  # Absolute path to conversion tool JAR
  #
  config.conversion_jar_path = Rails.root.join 'lib', 'assets', 'conversion', 'OpenWebslidesConverter.jar'

  ##
  # Default template
  #
  config.default_template = 'shower-ows'

  ##
  # Temporary directory for uploads
  #
  config.tmpdir = Rails.root.join 'tmp', 'uploads'

  #########################################
  ##       Database configuration        ##
  #########################################

  ##
  # Database configuration is stored in `config/database.yml`
  #

  #########################################
  ##         OAuth2 configuration        ##
  #########################################

  ##
  # GitHub OAuth2 credentials
  #
  config.oauth2.github_id = ENV['OWS_GITHUB_ID']
  config.oauth2.github_secret = ENV['OWS_GITHUB_SECRET']

  ##
  # Google OAuth2 credentials
  #
  config.oauth2.google_id = ENV['OWS_GOOGLE_ID']
  config.oauth2.google_secret = ENV['OWS_GOOGLE_SECRET']

  ##
  # Facebook OAuth2 credentials
  #
  config.oauth2.facebook_id = ENV['OWS_FACEBOOK_ID']
  config.oauth2.facebook_secret = ENV['OWS_FACEBOOK_SECRET']

  #########################################
  ##           API configuration         ##
  #########################################

  ##
  # Access token lifetime
  #
  config.api.token_lifetime = 24.hours

  ##
  # Signed asset URL lifetime
  #
  config.api.asset_url_lifetime = 5.hours

  #########################################
  ##     Backend store configuration     ##
  #########################################

  ##
  # Enable GitHub backend store
  #
  config.github.enabled = false

  ##
  # GitHub API endpoint
  #
  # https://api.github.com/ for GitHub
  # https://myhost.com/api/v3/ for GitHub Enterprise
  #
  config.github.api_endpoint = 'https://api.github.com'

  ##
  # GitHub hostname
  #
  config.github.ssh_host = 'github.com'

  ##
  # GitHub SSH username
  #
  config.github.ssh_user = 'git'

  ##
  # Path to private key
  #
  config.github.private_key = Rails.root.join 'config', 'openwebslides.pem'

  ##
  # Private key passphrase
  #
  config.github.private_key_passphrase = ENV['OWS_PRIVATE_KEY_PASSPHRASE']

  ##
  # GitHub organization to store repositories on
  #
  config.github.organization = 'OpenWebslides-Content'

  ##
  # GitHub machine user
  #
  config.github.repo_user = 'OpenWebslides-Platform'
  config.github.repo_user_passphrase = ENV['OWS_REPO_USER_PASSPHRASE']
end
