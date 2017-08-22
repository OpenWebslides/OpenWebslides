# frozen_string_literal: true

class AddIndicesOnGrants < ActiveRecord::Migration[5.1]
  def change
    add_index :grants, :user_id
    add_index :grants, :deck_id
  end
end
