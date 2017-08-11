# frozen_string_literal: true

class AddUniqueIndicesOnGrant < ActiveRecord::Migration[5.1]
  def change
    remove_index :grants, %i[user_id deck_id]
    remove_index :grants, %i[deck_id user_id]

    add_index :grants, %i[user_id deck_id], :unique => true
    add_index :grants, %i[deck_id user_id], :unique => true
  end
end
