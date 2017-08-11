# frozen_string_literal: true

class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.references :user, :null => false
      t.references :annotation, :null => false

      t.index %i[user_id annotation_id], :unique => true
      t.index %i[annotation_id user_id], :unique => true
    end
  end
end
