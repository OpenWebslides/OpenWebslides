# frozen_string_literal: true

# Load configuration
ows_config_file = Rails.root.join 'config', 'openwebslides.yml'
ows_config = YAML.safe_load ERB.new(File.read ows_config_file).result

# Parse configuration
OpenWebslides.config = OpenStruct.new
ows_config.each do |key, value|
  if value.is_a? Hash
    OpenWebslides.config.send "#{key.to_sym}=", OpenStruct.new(value)
  else
    OpenWebslides.config.send "#{key.to_sym}=", value
  end
end
