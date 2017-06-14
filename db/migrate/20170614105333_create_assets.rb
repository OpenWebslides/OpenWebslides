# frozen_string_literal: true

class CreateAssets < ActiveRecord::Migration[5.1]
  def change
    create_table :assets do |t|
      t.string :filename
      t.references :deck, :foreign_key => true

      t.timestamps
    end

    add_index :assets, %i[filename deck_id], :unique => true
  end
end
