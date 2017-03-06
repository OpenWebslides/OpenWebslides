# frozen_string_literal: true
namespace :db do
  desc 'Populates the database with sample data'
  task :populate => :environment do
    ActiveRecord::Base.transaction do
      user1 = FactoryGirl.create :user
      user2 = FactoryGirl.create :user
      user3 = FactoryGirl.create :user
      user4 = FactoryGirl.create :user

      FactoryGirl.create :deck, :owner => user1
      deck2 = FactoryGirl.create :deck, :with_tags, :owner => user2
      deck3 = FactoryGirl.create :deck, :with_tags, :owner => user3
      deck4 = FactoryGirl.create :deck, :with_tags, :owner => user4, :state => :protected_access
      deck5 = FactoryGirl.create :deck, :with_tags, :owner => user4, :state => :private_access

      deck2.contributors << user1
      deck3.contributors << user1
      deck3.contributors << user2
      deck4.contributors << user1
      deck5.contributors << user1
    end
  end
end
