# frozen_string_literal: true

class AddTitleToConversations < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :title, :string
  end
end
