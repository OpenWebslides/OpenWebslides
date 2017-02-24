class CreateJoinTableDeckTags < ActiveRecord::Migration[5.0]
  def change
    create_join_table :decks, :tags do |t|
      # t.index [:deck_id, :tag_id]
      # t.index [:tag_id, :deck_id]
    end
  end
end
