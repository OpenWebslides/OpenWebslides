# frozen_string_literal: true

require 'faker'
require 'benchmark'

require Rails.root.join 'config/initializers/active_record'
ActiveRecord::Base.skip_callbacks = true

namespace :db do
  desc 'Populates the database with sample data'
  task :sample => :environment do
    ##
    # Database size factor (10 =~ 100 users)
    #
    # Set this to 100 for testing
    #
    FACTOR = 10

    RANDOM = Random.new

    ##
    # Returns true in `chance` number of calls
    #
    def prob(chance)
      RANDOM.rand(1.0) < chance
    end

    # Silence logging
    ActiveRecord::Base.logger.level = Logger::WARN

    # Don't wast time on encrypting passwords
    Rails.application.config.devise.stretches = 1

    ActiveRecord::Base.transaction do
      ##
      # Users
      #
      users = FACTOR * 10

      users.times do |i|
        puts "Creating user #{i + 1}/#{users}"

        user = User.new :email => Faker::Internet.email,
                        :first_name => Faker::Name.first_name,
                        :password => Faker::Internet.password

        # 90% of the users have a last name
        user.last_name = Faker::Name.last_name if prob 0.9

        # 90% of the users are confirmed
        user.confirm if prob 0.9

        user.save!

        # 50% of the user have sign up with an external provider
        if prob 0.5
          user.identities.create :uid => Faker::Number.number(4),
                                 :provider => %i[github google_oauth2 facebook].sample
        end
      end

      ##
      # Decks
      #
      ActiveRecord::Base.skip_callbacks = true

      User.all.each_with_index do |user, i|
        # 20% of the users have no decks
        next if prob 0.2

        decks = RANDOM.rand 10

        # 10% of the users have a lot of decks
        decks = RANDOM.rand 100 if prob 0.1

        puts "Creating #{decks} decks for user #{i}/#{users}"

        decks.times do
          deck = user.decks.build :name => Faker::Lorem.words,
                                  :state => %i[public_access protected_access private_access].sample

          # 80% of the decks have a description
          deck.description = Faker::Lorem.words 10 if prob 0.8

          deck.save!
        end
      end
      puts "\n"

      ActiveRecord::Base.skip_callbacks = false
    end
  end
end
