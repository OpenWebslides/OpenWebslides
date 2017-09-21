# frozen_string_literal: true

class AddObjectTypeToNotification < ActiveRecord::Migration[5.1]
  def change
    add_column :notifications, :object_type, :string

    remove_index :notifications, :object_id
    add_index :notifications, %i[object_type object_id]
  end
end
