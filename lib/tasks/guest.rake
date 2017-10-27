# frozen_string_literal: true

require 'securerandom'

namespace :guest do
  desc 'Create one or more guest accounts'
  task :create, [:count] => :environment do |_, args|
    User.transaction do
      creds = []

      (args[:count] || 1).to_i.times do |i|
        email = "guest#{i}@openwebslides.ugent.be"

        while User.where(:email => email).any?
          i += 1
          email = "guest#{i}@openwebslides.ugent.be"
        end

        password = SecureRandom.hex 25
        creds << [email, password]

        user = User.new :email => email,
                        :password => password,
                        :first_name => 'Guest',
                        :tos_accepted => true

        user.skip_confirmation!
        user.confirm
        user.save
      end

      puts "\n"
      puts 'Created the following guest accounts:'
      creds.each { |c| puts "#{c.first}\t\t#{c.last}" }
    end
  end
end
