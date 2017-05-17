# frozen_string_literal: true

class AddTemplateToDecks < ActiveRecord::Migration[5.0]
  def change
    add_column :decks, :template, :string
  end
end
