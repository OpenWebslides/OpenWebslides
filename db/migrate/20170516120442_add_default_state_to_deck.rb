# frozen_string_literal: true

class AddDefaultStateToDeck < ActiveRecord::Migration[5.0]
  def change
    change_column_default :decks, :state, 0
  end
end
