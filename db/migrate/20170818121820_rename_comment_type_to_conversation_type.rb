# frozen_string_literal: true

class RenameCommentTypeToConversationType < ActiveRecord::Migration[5.1]
  def change
    rename_column :annotations, :comment_type, :conversation_type
  end
end
