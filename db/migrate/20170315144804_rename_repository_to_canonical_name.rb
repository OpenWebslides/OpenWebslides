# frozen_string_literal: true
class RenameRepositoryToCanonicalName < ActiveRecord::Migration[5.0]
  def self.up
    rename_column :decks, :repository, :canonical_name
  end

  def self.down
    rename_column :decks, :canonical_name, :repository
  end
end
