# frozen_string_literal: true

module Api
  class ApiResource < JSONAPI::Resource
    abstract

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def fetchable_fields
      # Omit null values
      super.collect do |field|
        field unless self.class._attributes.key?(field) && public_send(field).nil?
      end
    end
  end
end
