# frozen_string_literal: true

class UppercaseValueFormatter < JSONAPI::ValueFormatter
  class << self
    def format(raw_value)
      raw_value.upcase
    end

    def unformat(value)
      value.downcase
    end
  end
end
