# frozen_string_literal: true

class AddIdToDecksUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :decks_users, :id, :primary_key
  end
end
