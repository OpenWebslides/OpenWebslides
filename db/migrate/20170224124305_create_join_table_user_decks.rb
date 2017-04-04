# frozen_string_literal: true

class CreateJoinTableUserDecks < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :decks do |t|
      t.index %i[user_id deck_id]
      t.index %i[deck_id user_id]
    end
  end
end
