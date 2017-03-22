# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170322082939) do

  create_table "decks", force: :cascade do |t|
    t.text     "name"
    t.text     "canonical_name"
    t.integer  "state"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "description"
    t.index ["canonical_name"], name: "index_decks_on_canonical_name", unique: true
    t.index ["user_id"], name: "index_decks_on_user_id"
  end

  create_table "decks_tags", id: false, force: :cascade do |t|
    t.integer "deck_id", null: false
    t.integer "tag_id",  null: false
    t.index ["deck_id", "tag_id"], name: "index_decks_tags_on_deck_id_and_tag_id"
    t.index ["tag_id", "deck_id"], name: "index_decks_tags_on_tag_id_and_deck_id"
  end

  create_table "decks_users", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "deck_id", null: false
    t.index ["deck_id", "user_id"], name: "index_decks_users_on_deck_id_and_user_id"
    t.index ["user_id", "deck_id"], name: "index_decks_users_on_user_id_and_deck_id"
  end

  create_table "identities", force: :cascade do |t|
    t.string   "uid"
    t.string   "provider"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid", "provider"], name: "index_identities_on_uid_and_provider", unique: true
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.text     "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.text     "name"
    t.text     "email"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "provider",               default: "", null: false
    t.string   "uid",                    default: "", null: false
    t.text     "tokens"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

end
