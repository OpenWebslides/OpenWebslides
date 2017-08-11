# frozen_string_literal: true

class AddStateToAnnotation < ActiveRecord::Migration[5.1]
  def change
    add_column :annotations, :state, :integer
  end
end
