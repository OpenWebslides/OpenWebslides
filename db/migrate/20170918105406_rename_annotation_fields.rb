# frozen_string_literal: true

class RenameAnnotationFields < ActiveRecord::Migration[5.1]
  def change
    rename_column :notifications, :event_type, :predicate
    rename_column :notifications, :user_id, :subject_id
    rename_column :notifications, :deck_id, :object_id
  end
end
