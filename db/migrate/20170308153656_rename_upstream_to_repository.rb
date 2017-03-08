# frozen_string_literal: true
class RenameUpstreamToRepository < ActiveRecord::Migration[5.0]
  def self.up
    rename_column :decks, :upstream, :repository
  end

  def self.down
    rename_column :decks, :repository, :upstream
  end
end
