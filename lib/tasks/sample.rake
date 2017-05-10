# frozen_string_literal: true

require 'faker'

require Rails.root.join 'config/initializers/active_record'
ActiveRecord::Base.skip_callbacks = true

namespace :db do
  desc 'Populates the database with sample data'
  task :sample => :environment do
    # Database size factor (10 =~ 100 users)
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

    ActiveRecord::Base.transaction do
      ##
      # Users
      #
      users = FACTOR * 10

      users.times do |i|
        print "Creating user #{i + 1}/#{users}\r"
        $stdout.flush

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
      print "\n"
    end
  end
end
