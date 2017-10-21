# frozen_string_literal: true

##
# Allow authorizing state machine events
#
module EventAuthorizable
  extend ActiveSupport::Concern

  def authorize_event(record, event)
    authorize record, :"fsm_#{event.to_s}?"
  end
end
