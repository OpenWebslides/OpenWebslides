# frozen_string_literal: true

class DateValueFormatter < JSONAPI::ValueFormatter
  class << self
    def format(raw_value)
      raw_value.to_i.to_s
    end

    def unformat(value)
      Time.zone.at value
    end
  end
end
