# frozen_string_literal: true

namespace :token do
  desc 'Generate long lifetime JWT'
  task :generate, [:id] => :environment do |_, args|
    abort 'User ID expected' unless args[:id]

    user = User.find Integer args[:id]

    token = JWT::Auth::Token.new
    token.subject = user
    token.expiration = 10.years.from_now.to_i

    puts "Bearer #{token.to_jwt}"
  end
end
