# frozen_string_literal: true

module Api
  class NotificationResource < ApiResource
    immutable

    ##
    # Properties
    #
    attribute :event_type, :format => :uppercase
    attribute :created_at, :format => :date
    attributes :user_name, :deck_name

    has_one :user, :always_include_linkage_data => true
    has_one :deck, :always_include_linkage_data => true

    ##
    # Filters
    #
    filters :user, :deck
    filter :event_type, :verify => ->(values, _) { values.map(&:downcase) & Notification.event_types.keys }

    ##
    # Callbacks
    #
    ##
    # Methods
    #
    def self.sortable_fields(_)
      [:created_at]
    end

    def self.default_sort
      [{ :field => 'created_at', :direction => :desc }]
    end

    def user_name
      @model.user.name
    end

    def deck_name
      @model.deck.name
    end
  end
end
