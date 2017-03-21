# frozen_string_literal: true
# Monkey-patch ActiveRecord to allow disabling callbacks
module ActiveRecord
  class Base
    cattr_accessor :skip_callbacks
  end
end
