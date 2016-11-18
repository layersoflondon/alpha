# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20161118122855) do

  create_table "collection_pins", force: :cascade do |t|
    t.integer  "pin_id"
    t.integer  "collection_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "aasm_state"
  end

  add_index "collection_pins", ["collection_id"], name: "index_collection_pins_on_collection_id"
  add_index "collection_pins", ["pin_id"], name: "index_collection_pins_on_pin_id"

  create_table "collections", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "content_entries", force: :cascade do |t|
    t.integer  "content_type_id"
    t.string   "attached_file_id"
    t.string   "attached_file_filename"
    t.integer  "attached_file_size"
    t.string   "attached_file_content_type"
    t.text     "video_url"
    t.text     "content"
    t.text     "data"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "tileserver_url"
    t.text     "attribution"
    t.text     "metadata"
  end

  add_index "content_entries", ["content_type_id"], name: "index_content_entries_on_content_type_id"

  create_table "content_types", force: :cascade do |t|
    t.string   "name"
    t.string   "mime_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "overlay_content_entries", force: :cascade do |t|
    t.integer  "overlay_id"
    t.integer  "content_entry_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "overlay_content_entries", ["content_entry_id"], name: "index_overlay_content_entries_on_content_entry_id"
  add_index "overlay_content_entries", ["overlay_id"], name: "index_overlay_content_entries_on_overlay_id"

  create_table "overlay_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "overlays", force: :cascade do |t|
    t.string   "title"
    t.float    "lat"
    t.float    "lng"
    t.datetime "date_from"
    t.datetime "date_to"
    t.text     "description"
    t.integer  "overlay_type_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "overlays", ["overlay_type_id"], name: "index_overlays_on_overlay_type_id"

  create_table "pin_content_entries", force: :cascade do |t|
    t.integer  "pin_id"
    t.integer  "content_entry_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "pin_content_entries", ["content_entry_id"], name: "index_pin_content_entries_on_content_entry_id"
  add_index "pin_content_entries", ["pin_id"], name: "index_pin_content_entries_on_pin_id"

  create_table "pins", force: :cascade do |t|
    t.float    "lat"
    t.float    "lng"
    t.string   "title"
    t.datetime "date_from"
    t.datetime "date_to"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "aasm_state"
    t.string   "link_url"
    t.text     "description"
  end

  add_index "pins", ["user_id"], name: "index_pins_on_user_id"

  create_table "user_collections", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "collection_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "user_collections", ["collection_id"], name: "index_user_collections_on_collection_id"
  add_index "user_collections", ["user_id"], name: "index_user_collections_on_user_id"

  create_table "user_group_collections", force: :cascade do |t|
    t.integer  "user_group_id"
    t.integer  "collection_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "user_group_collections", ["collection_id"], name: "index_user_group_collections_on_collection_id"
  add_index "user_group_collections", ["user_group_id"], name: "index_user_group_collections_on_user_group_id"

  create_table "user_group_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "user_group_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "user_group_users", ["user_group_id"], name: "index_user_group_users_on_user_group_id"
  add_index "user_group_users", ["user_id"], name: "index_user_group_users_on_user_id"

  create_table "user_groups", force: :cascade do |t|
    t.integer  "primary_user_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "user_groups", ["primary_user_id"], name: "index_user_groups_on_primary_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.string   "last_name"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
