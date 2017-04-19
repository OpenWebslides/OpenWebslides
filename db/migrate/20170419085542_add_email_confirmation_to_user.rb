# frozen_string_literal: true

class AddEmailConfirmationToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :confirmation_token, :string, :unique => true
  end
end
