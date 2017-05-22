# frozen_string_literal: true

RSpec.configure do |config|
  # Allow disabling ActiveRecord callbacks
  config.before(:all, :callbacks => true) do
    ActiveRecord::Base.skip_callbacks = false
  end

  config.after(:all, :callbacks => true) do
    ActiveRecord::Base.skip_callbacks = true
  end
end
