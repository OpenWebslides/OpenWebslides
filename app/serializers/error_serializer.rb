# frozen_string_literal: true

module ErrorSerializer
  def self.serialize_object(object)
    object.errors.messages.map do |field, errors|
      errors.map do |error_message|
        {
          :source => {
            :pointer => "/data/attributes/#{field}"
          },
          :detail => error_message
        }
      end
    end.flatten
  end

  def self.serialize_exception(exception)
    {
      :detail => exception.message
    }
  end
end
