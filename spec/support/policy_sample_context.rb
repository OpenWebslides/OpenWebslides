# frozen_string_literal: true

RSpec.shared_context 'policy_sample', :shared_context => :metadata do
  before :each do
    ActiveRecord::Base.transaction do
      u1 = create :user, :confirmed, :first_name => 'user1'
      u2 = create :user, :confirmed, :first_name => 'user2'
      u3 = create :user, :confirmed, :first_name => 'user3'
      u4 = create :user, :confirmed, :first_name => 'user4'

      # User 1
      u1d1 = create :deck, :with_assets, :with_conversations, :owner => u1, :name => 'u1d1'
      u1d2 = create :deck, :with_assets, :with_conversations, :owner => u1, :name => 'u1d2', :state => :protected_access
      u1d3 = create :deck, :with_assets, :with_conversations, :owner => u1, :name => 'u1d3', :state => :private_access
      u1d4 = create :deck, :with_assets, :with_conversations, :owner => u1, :name => 'u1d4', :state => :private_access
      u1d4.collaborators << u2
      u1d4.collaborators << u3

      # User 2
      u2d1 = create :deck, :with_assets, :with_conversations, :owner => u2, :name => 'u2d1'
      u2d2 = create :deck, :with_assets, :with_conversations, :owner => u2, :name => 'u2d2', :state => :protected_access
      u2d3 = create :deck, :with_assets, :with_conversations, :owner => u2, :name => 'u2d3', :state => :private_access
      u2d4 = create :deck, :with_assets, :with_conversations, :owner => u2, :name => 'u2d4', :state => :private_access
      u2d4.collaborators << u1
      u2d4.collaborators << u3

      # User 3
      u3d1 = create :deck, :with_assets, :with_conversations, :owner => u3, :name => 'u3d1'
      u3d2 = create :deck, :with_assets, :with_conversations, :owner => u3, :name => 'u3d2', :state => :protected_access
      u3d3 = create :deck, :with_assets, :with_conversations, :owner => u3, :name => 'u3d3', :state => :private_access
      u3d4 = create :deck, :with_assets, :with_conversations, :owner => u3, :name => 'u3d4', :state => :private_access
      u3d4.collaborators << u1
      u3d4.collaborators << u2

      # User 4
      u4d1 = create :deck, :with_assets, :with_conversations, :owner => u4, :name => 'u4d1'
      u4d2 = create :deck, :with_assets, :with_conversations, :owner => u4, :name => 'u4d2', :state => :protected_access
      u4d3 = create :deck, :with_assets, :with_conversations, :owner => u4, :name => 'u4d3', :state => :private_access
    end
  end
end
