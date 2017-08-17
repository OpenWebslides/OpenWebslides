# frozen_string_literal: true

class AddTermsAcceptedToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :tos_accepted, :boolean
  end
end
