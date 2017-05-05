# frozen_string_literal: true

unless defined? FactoryGirl
  require 'factory_girl'
  require 'faker'

  Dir[Rails.root.join 'spec/factories/**/*.rb'].each { |f| require f }
end

require Rails.root.join 'config/initializers/active_record'
ActiveRecord::Base.skip_callbacks = true

namespace :db do
  desc 'Populates the database with sample data'
  task :sample => :environment do
    ActiveRecord::Base.transaction do
      u1 = FactoryGirl.create :user, :first_name => 'user1', :password => 'a', :password_confirmation => 'a'
      u2 = FactoryGirl.create :user, :first_name => 'user2', :password => 'a', :password_confirmation => 'a'
      u3 = FactoryGirl.create :user, :first_name => 'user3', :password => 'a', :password_confirmation => 'a'
      u4 = FactoryGirl.create :user, :first_name => 'user4', :password => 'a', :password_confirmation => 'a'

      u1.confirm
      u2.confirm
      u3.confirm
      u4.confirm

      # User 1
      u1d1 = FactoryGirl.create :deck, :owner => u1, :name => 'u1d1'
      u1d2 = FactoryGirl.create :deck, :owner => u1, :name => 'u1d2', :state => :protected_access
      u1d3 = FactoryGirl.create :deck, :owner => u1, :name => 'u1d3', :state => :private_access
      u1d4 = FactoryGirl.create :deck, :owner => u1, :name => 'u1d4', :state => :private_access
      u1d4.contributors << u2
      u1d4.contributors << u3

      # User 2
      u2d1 = FactoryGirl.create :deck, :owner => u2, :name => 'u2d1'
      u2d2 = FactoryGirl.create :deck, :owner => u2, :name => 'u2d2', :state => :protected_access
      u2d3 = FactoryGirl.create :deck, :owner => u2, :name => 'u2d3', :state => :private_access
      u2d4 = FactoryGirl.create :deck, :owner => u2, :name => 'u2d4', :state => :private_access
      u2d4.contributors << u1
      u2d4.contributors << u3

      # User 3
      u3d1 = FactoryGirl.create :deck, :owner => u3, :name => 'u3d1'
      u3d2 = FactoryGirl.create :deck, :owner => u3, :name => 'u3d2', :state => :protected_access
      u3d3 = FactoryGirl.create :deck, :owner => u3, :name => 'u3d3', :state => :private_access
      u3d4 = FactoryGirl.create :deck, :owner => u3, :name => 'u3d4', :state => :private_access
      u3d4.contributors << u1
      u3d4.contributors << u2

      # User 4
      u4d1 = FactoryGirl.create :deck, :owner => u4, :name => 'u4d1'
      u4d2 = FactoryGirl.create :deck, :owner => u4, :name => 'u4d2', :state => :protected_access
      u4d3 = FactoryGirl.create :deck, :owner => u4, :name => 'u4d3', :state => :private_access

      Notification.create :event_type => :deck_created, :deck => Deck.first, :user => User.first
    end
  end
end
