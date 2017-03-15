# frozen_string_literal: true
module OpenWebslides
  module Configuration
    # Load configuration
    config_file = Rails.root.join 'config', 'openwebslides.yml'
    config = YAML.safe_load ERB.new(File.read config_file).result

    # Parse configuration
    config.each do |key, value|
      self.class.send :attr_accessor, key.to_sym
      value = OpenStruct.new value if value.is_a? Hash
      instance_variable_set :"@#{key}", value
    end
  end
end
