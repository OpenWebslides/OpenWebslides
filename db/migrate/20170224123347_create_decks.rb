class CreateDecks < ActiveRecord::Migration[5.0]
  def change
    create_table :decks do |t|
      t.text :name
      t.text :upstream
      t.integer :state

      t.timestamps
    end
  end
end
