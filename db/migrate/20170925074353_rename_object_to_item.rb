# frozen_string_literal: true

class RenameObjectToItem < ActiveRecord::Migration[5.1]
  def change
    rename_column :notifications, :object_id, :item_id
    rename_column :notifications, :object_type, :item_type
  end
end
