# frozen_string_literal: true
class CreateDecks < ActiveRecord::Migration[5.0]
  def change
    create_table :decks do |t|
      t.text :name
      t.text :upstream
      t.integer :state
      t.references :user, :foreign_key => true

      t.timestamps
    end
  end
end
