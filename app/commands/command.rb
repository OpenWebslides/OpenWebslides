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

  protected

  ##
  # Execute an action (internal helper)
  #
  def exec(klass)
    command = klass.new @receiver
    yield command if block_given?

    command.execute
  end
end
