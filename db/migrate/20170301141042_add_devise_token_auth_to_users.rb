# frozen_string_literal: true
class AddDeviseTokenAuthToUsers < ActiveRecord::Migration[5.0]
  def self.up
    change_table :users do |t|
      ## Required
      t.string :provider, :null => false, :default => ''
      t.string :uid, :null => false, :default => ''

      ## Tokens
      t.text :tokens
    end

    add_index :users, [:uid, :provider], :unique => true
  end

  def self.down
    # By default, we don't want to make any assumption about how to roll back a migration when your
    # model already existed. Please edit below which fields you would like to remove in this migration.
    raise ActiveRecord::IrreversibleMigration
  end
end
