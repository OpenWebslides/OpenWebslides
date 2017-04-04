# frozen_string_literal: true

class CreateDecks < ActiveRecord::Migration[5.0]
  def change
    create_table :decks do |t|
      t.string :name
      t.string :canonical_name, :unique => true
      t.integer :state
      t.string :description
      t.references :user, :foreign_key => true

      t.timestamps
    end
  end
end
