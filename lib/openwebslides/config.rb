# frozen_string_literal: true
module OpenWebslides
  class << self
    attr_accessor :config
  end
end

# Load configuration
config_file = Rails.root.join 'config', 'openwebslides.yml'
config = YAML.safe_load ERB.new(File.read config_file).result

# Parse configuration
OpenWebslides.config = OpenStruct.new
OpenWebslides.config.provider = OpenStruct.new config['provider']
