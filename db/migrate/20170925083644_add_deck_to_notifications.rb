# frozen_string_literal: true

class AddDeckToNotifications < ActiveRecord::Migration[5.1]
  def change
    add_reference :notifications, :deck
  end
end
