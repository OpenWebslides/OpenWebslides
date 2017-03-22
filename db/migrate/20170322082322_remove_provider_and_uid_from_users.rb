# frozen_string_literal: true
class RemoveProviderAndUidFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :user, :uid
    remove_column :users, :user, :provider
  end
end
