# frozen_string_literal: true

module Api
  class NotificationResource < ApiResource
    immutable

    ##
    # Properties
    #
    attribute :event_type, :format => :uppercase
    attributes :created_at, :user_name, :deck_name

    has_one :user, :always_include_linkage_data => true
    has_one :deck, :always_include_linkage_data => true

    ##
    # Filters
    #
    filters :user, :deck
    filter :event_type, :verify => ->(values, _) { values & Notification.event_types.keys }

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.sortable_fields(_)
      []
    end

    def created_at
      @model.created_at.to_i.to_s
    end

    def user_name
      @model.user.name
    end

    def deck_name
      @model.deck.name
    end
  end
end
