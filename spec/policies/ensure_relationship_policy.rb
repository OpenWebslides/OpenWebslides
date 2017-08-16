# frozen_string_literal: true

require 'rails_helper'

# Skip certain policy actions
BLACKLIST = {
  ConversionPolicy => %i[
                          create_deck?
                          update_deck?
                          destroy_deck?

                          create_user?
                          update_user?
                          destroy_user?
                        ],
  AssetPolicy => %i[
                    create_deck?
                    update_deck?
                    destroy_deck?
                  ],
  DeckPolicy => %i[
                    create_owner?

                    create_conversations?
                    update_conversations?
                    destroy_conversations?
                  ],
  NotificationPolicy => %i[
                            create_deck?
                            update_deck?
                            destroy_deck?

                            create_user?
                            update_user?
                            destroy_user?
                          ],
}

# Ensure that every relationship has corresponding policy actions
RSpec.describe 'relationship policy actions' do
  ObjectSpace.each_object(Class).select { |klass| klass < ApplicationResource }.each do |klass|
    klass._relationships.each do |rel, _|
      policy = "#{klass._model_name}Policy".constantize

      describe policy do
        subject { policy.new nil, nil }

        actions = %I[
                      index?
                      show?
                      update?
                      destroy?

                      create_#{rel.to_s}?
                      show_#{rel.to_s}?
                      update_#{rel.to_s}?
                      destroy_#{rel.to_s}?
        ]

        actions.each do |action|
          next if BLACKLIST.key?(policy) && BLACKLIST[policy].include?(action)

          it { is_expected.to respond_to action }
        end
      end
    end
  end
end
