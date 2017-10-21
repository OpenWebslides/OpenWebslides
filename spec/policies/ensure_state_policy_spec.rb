# frozen_string_literal: true

require 'rails_helper'

##
# This script will iterate over all models, and if the model has a state machine,
# it will check if there is a policy action defined for all states.
#

##
# Models without API interaction
#
MODEL_BLACKLIST = [
].freeze

##
# Relations without API interaction
#
ACTION_BLACKLIST = {
}.freeze

RSpec.describe 'state machine policy actions' do
  ApplicationRecord.descendants.each do |model|
    next if MODEL_BLACKLIST.include? model
    next unless model.respond_to? :state_machines

    policy_class = "#{model}Policy".constantize

    describe policy_class do
      let(:subject) { policy_class.new nil, nil }
      model.state_machines.each do |state_machine|
        state_machine[1].events.map(&:name).each do |event|
          unless ACTION_BLACKLIST.key?(policy_class) && ACTION_BLACKLIST[policy_class].include?(action)
            it { is_expected.to respond_to "fsm_#{event}?" }
          end
        end
      end
    end
  end
end
