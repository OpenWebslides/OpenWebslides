# frozen_string_literal: true

require 'faker'
require 'factory_girl'

namespace :db do
  desc 'Populates the database with sample data'
  task :sample => :environment do
    ##
    # Database size factor (10 =~ 100 users)
    #
    # Set this to 100 for testing
    #
    FACTOR = 1

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
      user_count = (FACTOR * 10).to_i
      users = []

      user_count.times do |i|
        puts "Creating user #{i + 1}/#{user_count}"

        user = User.new :email => Faker::Internet.email,
                        :first_name => Faker::Name.first_name,
                        :password => Faker::Internet.password

        # 90% of the users have a last name
        user.last_name = Faker::Name.last_name if prob 0.9

        # 90% of the users are confirmed
        user.confirm if prob 0.9

        user.save!
        users << user

        # 50% of the user have sign up with an external provider
        if prob 0.5
          user.identities.create :uid => Faker::Number.number(4),
                                 :provider => %i[github google_oauth2 facebook].sample
        end
      end

      ##
      # Decks
      #
      decks = []

      users.each_with_index do |user, i|
        # 20% of the users have no decks
        next if prob 0.2

        deck_count = RANDOM.rand 10

        # 10% of the users have a lot of decks
        deck_count = RANDOM.rand 100 if prob 0.1

        puts "Creating #{deck_count} decks for user #{i + 1}/#{user_count}"

        deck_count.times do
          deck = user.decks.build :name => Faker::Lorem.words.join(' '),
                                  :state => %i[public_access protected_access private_access].sample

          # 80% of the decks have a description
          deck.description = Faker::Lorem.words(10).join(' ') if prob 0.8

          # Add some random collaborators
          RANDOM.rand(5).times do
            user = User.offset(RANDOM.rand user_count).first
            deck.collaborators << user unless deck.collaborators.include? user
          end

          deck.save!
          decks << deck
        end
      end

      decks.each_with_index do |deck, i|
        notification_count = RANDOM.rand 100

        puts "Creating #{notification_count + 1} events for deck #{i + 1}/#{decks.size}"

        creation_time = RANDOM.rand(1.year)

        # Deck created
        Notification.create :event_type => :deck_created,
                            :user => deck.owner,
                            :deck => deck,
                            :created_at => creation_time.seconds.ago,
                            :updated_at => creation_time.seconds.ago

        # Deck updated
        notification_count.times do
          Notification.create :event_type => :deck_updated,
                              :user => ([deck.owner] + deck.collaborators).sample,
                              :deck => deck,
                              :created_at => RANDOM.rand(creation_time).seconds.ago,
                              :updated_at => RANDOM.rand(creation_time).seconds.ago
        end
      end
    end
  end
end
