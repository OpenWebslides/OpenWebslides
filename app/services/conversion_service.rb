# frozen_string_literal: true

class ConversionService
  attr_accessor :conversion

  def initialize(conversion)
    @conversion = conversion
  end

  def create
    if @conversion.save
      ConversionWorker.perform_async @conversion.id

      true
    else
      false
    end
  end
end
