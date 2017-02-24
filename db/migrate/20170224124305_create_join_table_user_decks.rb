class CreateJoinTableUserDecks < ActiveRecord::Migration[5.0]
  def change
    create_join_table :users, :decks do |t|
      # t.index [:user_id, :deck_id]
      # t.index [:deck_id, :user_id]
    end
  end
end
