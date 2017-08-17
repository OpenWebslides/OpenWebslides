# frozen_string_literal: true

##
# This initialization process checks whether the files and folders in `data/`
# match the database. If not, the database and/or `data/` folder is inconsistent
# and the server is halted.
#

begin
  # Ensure all repos have a deck in the database
  Dir[Rails.root.join 'data', '*'].each do |repo|
    next if Deck.where(:canonical_name => File.basename(repo)).any?

    Rails.logger.error "Deck for repository '#{File.basename repo}' in 'data/#{File.basename repo}' not found in the database. Did you reset the database without clearing out 'data/'?"
    abort
  end

  # Ensure all decks in the database have a repository
  Deck.all.each do |deck|
    next if Dir.exist? Rails.root.join 'data', deck.canonical_name

    Rails.logger.error "Repository for deck '#{deck.inspect}' not found in 'data/#{deck.canonical_name}'. Did you clear out 'data/' without resetting the database?"
    abort
  end
rescue ActiveRecord::StatementInvalid
  # Migrations have not been run yet
end
