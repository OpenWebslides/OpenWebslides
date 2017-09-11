# frozen_string_literal: true

class DropAssets < ActiveRecord::Migration[5.1]
  def change
    drop_table :assets
  end
end
