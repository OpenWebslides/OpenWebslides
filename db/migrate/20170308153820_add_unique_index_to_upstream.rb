# frozen_string_literal: true
class AddUniqueIndexToUpstream < ActiveRecord::Migration[5.0]
  def up
    add_index :decks, :repository, :unique => true
  end

  def down
    drop_index :decks, :repository
  end
end
