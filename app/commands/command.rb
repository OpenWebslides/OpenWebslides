# frozen_string_literal: true

##
# Generic command class
#
class Command
  attr_reader :receiver

  def initialize(receiver)
    @receiver = receiver
  end

  ##
  # Execute the action
  #
  def execute; end
end
