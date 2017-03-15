# frozen_string_literal: true

# Require provider based on configuration
require "openwebslides/provider/#{OpenWebslides.config.provider.type}"
