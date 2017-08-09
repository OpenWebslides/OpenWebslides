# frozen_string_literal: true

class CreateAnnotations < ActiveRecord::Migration[5.1]
  def change
    create_table :annotations do |t|
      t.string :type
      t.string :content_item_id
      t.references :user, :foreign_key => true
      t.references :deck, :foreigh_key => true

      t.timestamps
    end
  end
end
