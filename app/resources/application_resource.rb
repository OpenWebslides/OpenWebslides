# frozen_string_literal: true

##
# REST resource
#
class ApplicationResource < JSONAPI::Resource
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

  def records_for(relation_name)
    record_or_records = @model.public_send(relation_name)
    relationship = self.class._relationships[relation_name]

    case relationship
    when JSONAPI::Relationship::ToOne
      record_or_records
    when JSONAPI::Relationship::ToMany
      ::Pundit.policy_scope!(context[:user], record_or_records)
    else
      raise "Unknown relationship type #{relationship.inspect}"
    end
  end

  class << self
    def records(options = {})
      ::Pundit.policy_scope!(options[:context][:user], _model_class)
    end
  end
end
