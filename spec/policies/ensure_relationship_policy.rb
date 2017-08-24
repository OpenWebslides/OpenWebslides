# frozen_string_literal: true

require 'rails_helper'

# Skip certain policy actions
BLACKLIST = {
  RatingPolicy => %i[show_annotation show_user]
}

# Ensure that every relationship has corresponding policy actions
RSpec.describe 'relationship policy actions' do
  ObjectSpace.each_object(Class).select { |klass| klass < ApplicationResource }.each do |klass|
    klass._relationships.each do |rel, _|
      policy = klass.to_s.gsub('Resource', 'Policy').constantize

      describe 'relationship policy' do
        subject { policy.new nil, nil }

        actions = %I[
                      index?
                      show?
                      update?
                      destroy?

                      show_#{rel.to_s}?
        ]

        actions.each do |action|
          next if BLACKLIST.key?(policy) && BLACKLIST[policy].include?(action)

          it { is_expected.to respond_to action }
        end
      end
    end
  end
end
