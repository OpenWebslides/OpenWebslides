# frozen_string_literal: true

class AddCommentAttributesToAnnotation < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :text, :string
    add_column :annotations, :comment_type, :integer
    add_reference :annotations, :conversation, :index => true
  end
end
