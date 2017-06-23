# frozen_string_literal: true

class CreateConversions < ActiveRecord::Migration[5.1]
  def change
    create_table :conversions do |t|
      t.string :filename
      t.string :name
      t.integer :status
      t.references :deck, :foreign_key => true
      t.references :user, :foreign_key => true

      t.timestamps
    end
  end
end
