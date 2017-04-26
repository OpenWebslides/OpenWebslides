# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name, :null => false, :default => ''
      t.string :last_name

      ## Database authenticatable
      t.string :email, :null => false, :default => ''
      t.string :encrypted_password, :null => false, :default => ''

      ## Recoverable
      t.string :reset_password_token
      t.datetime :reset_password_sent_at

      ## Trackable
      t.integer :sign_in_count, :null => false, :default => 0
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string :current_sign_in_ip
      t.string :last_sign_in_ip

      ## Confirmable
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at

      t.timestamps
    end

    add_index :users, :email, :unique => true
    add_index :users, :reset_password_token, :unique => true
    add_index :users, :confirmation_token, :unique => true
  end
end
