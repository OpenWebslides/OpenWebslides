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

ActiveRecord::Schema.define(version: 20170918105406) do

  create_table "annotations", force: :cascade do |t|
    t.string "type"
    t.string "content_item_id"
    t.integer "user_id"
    t.integer "deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "text"
    t.integer "conversation_type"
    t.integer "conversation_id"
    t.integer "state"
    t.string "title"
    t.index ["conversation_id"], name: "index_annotations_on_conversation_id"
    t.index ["deck_id"], name: "index_annotations_on_deck_id"
    t.index ["user_id"], name: "index_annotations_on_user_id"
  end

  create_table "assets", force: :cascade do |t|
    t.string "filename"
    t.integer "deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_assets_on_deck_id"
    t.index ["filename", "deck_id"], name: "index_assets_on_filename_and_deck_id", unique: true
  end

  create_table "conversions", force: :cascade do |t|
    t.string "filename"
    t.string "name"
    t.integer "status"
    t.integer "deck_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_conversions_on_deck_id"
    t.index ["user_id"], name: "index_conversions_on_user_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "name"
    t.string "canonical_name"
    t.integer "state", default: 0
    t.string "description"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "template"
    t.index ["user_id"], name: "index_decks_on_user_id"
  end

  create_table "grants", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "deck_id", null: false
    t.index ["deck_id", "user_id"], name: "index_grants_on_deck_id_and_user_id", unique: true
    t.index ["deck_id"], name: "index_grants_on_deck_id"
    t.index ["user_id", "deck_id"], name: "index_grants_on_user_id_and_deck_id", unique: true
    t.index ["user_id"], name: "index_grants_on_user_id"
  end

  create_table "identities", force: :cascade do |t|
    t.string "uid"
    t.string "provider"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["uid", "provider"], name: "index_identities_on_uid_and_provider", unique: true
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "predicate"
    t.integer "subject_id"
    t.integer "object_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["object_id"], name: "index_notifications_on_object_id"
    t.index ["subject_id"], name: "index_notifications_on_subject_id"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "annotation_id", null: false
    t.index ["annotation_id", "user_id"], name: "index_ratings_on_annotation_id_and_user_id", unique: true
    t.index ["annotation_id"], name: "index_ratings_on_annotation_id"
    t.index ["user_id", "annotation_id"], name: "index_ratings_on_user_id_and_annotation_id", unique: true
    t.index ["user_id"], name: "index_ratings_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "token_version", default: 1, null: false
    t.boolean "tos_accepted"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
