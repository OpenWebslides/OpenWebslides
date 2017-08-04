# frozen_string_literal: true

class RenameDecksUsersToGrant < ActiveRecord::Migration[5.1]
  def change
    rename_table :decks_users, :grants
  end
end
