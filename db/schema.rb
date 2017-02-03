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

ActiveRecord::Schema.define(version: 20170203150437) do

  create_table "collection_pins", force: :cascade do |t|
    t.integer  "pin_id",        limit: 4
    t.integer  "collection_id", limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "aasm_state",    limit: 255
  end

  add_index "collection_pins", ["collection_id"], name: "index_collection_pins_on_collection_id", using: :btree
  add_index "collection_pins", ["pin_id"], name: "index_collection_pins_on_pin_id", using: :btree

  create_table "collections", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "content_entries", force: :cascade do |t|
    t.integer  "content_type_id", limit: 4
    t.text     "video_url",       limit: 65535
    t.text     "content",         limit: 65535
    t.text     "attribution",     limit: 65535
    t.text     "data",            limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "tileserver_url",  limit: 255
    t.text     "metadata",        limit: 65535
    t.string   "attached_file",   limit: 255
    t.string   "file_name",       limit: 255
  end

  add_index "content_entries", ["content_type_id"], name: "index_content_entries_on_content_type_id", using: :btree

  create_table "content_types", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "mime_type",   limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "description", limit: 255
    t.integer  "suitability", limit: 4
  end

  create_table "overlay_content_entries", force: :cascade do |t|
    t.integer  "overlay_id",       limit: 4
    t.integer  "content_entry_id", limit: 4
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "overlay_content_entries", ["content_entry_id"], name: "index_overlay_content_entries_on_content_entry_id", using: :btree
  add_index "overlay_content_entries", ["overlay_id"], name: "index_overlay_content_entries_on_overlay_id", using: :btree

  create_table "overlays", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.float    "lat",         limit: 24
    t.float    "lng",         limit: 24
    t.datetime "date_from"
    t.datetime "date_to"
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "pin_content_entries", force: :cascade do |t|
    t.integer  "pin_id",           limit: 4
    t.integer  "content_entry_id", limit: 4
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "pin_content_entries", ["content_entry_id"], name: "index_pin_content_entries_on_content_entry_id", using: :btree
  add_index "pin_content_entries", ["pin_id"], name: "index_pin_content_entries_on_pin_id", using: :btree

  create_table "pins", force: :cascade do |t|
    t.float    "lat",         limit: 24
    t.float    "lng",         limit: 24
    t.string   "title",       limit: 255
    t.datetime "date_from"
    t.datetime "date_to"
    t.integer  "user_id",     limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "aasm_state",  limit: 255
    t.string   "link_url",    limit: 255
    t.text     "description", limit: 65535
    t.string   "location",    limit: 255
  end

  add_index "pins", ["user_id"], name: "index_pins_on_user_id", using: :btree

  create_table "user_collections", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.integer  "collection_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "user_collections", ["collection_id"], name: "index_user_collections_on_collection_id", using: :btree
  add_index "user_collections", ["user_id"], name: "index_user_collections_on_user_id", using: :btree

  create_table "user_group_collections", force: :cascade do |t|
    t.integer  "user_group_id", limit: 4
    t.integer  "collection_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "user_group_collections", ["collection_id"], name: "index_user_group_collections_on_collection_id", using: :btree
  add_index "user_group_collections", ["user_group_id"], name: "index_user_group_collections_on_user_group_id", using: :btree

  create_table "user_group_users", force: :cascade do |t|
    t.integer  "user_id",       limit: 4
    t.integer  "user_group_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "user_group_users", ["user_group_id"], name: "index_user_group_users_on_user_group_id", using: :btree
  add_index "user_group_users", ["user_id"], name: "index_user_group_users_on_user_id", using: :btree

  create_table "user_groups", force: :cascade do |t|
    t.integer  "primary_user_id", limit: 4
    t.string   "name",            limit: 255
    t.text     "description",     limit: 65535
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "user_groups", ["primary_user_id"], name: "index_user_groups_on_primary_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "first_name",             limit: 255
    t.string   "last_name",              limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "collection_pins", "collections"
  add_foreign_key "collection_pins", "pins"
  add_foreign_key "content_entries", "content_types"
  add_foreign_key "overlay_content_entries", "content_entries"
  add_foreign_key "overlay_content_entries", "overlays"
  add_foreign_key "pin_content_entries", "content_entries"
  add_foreign_key "pin_content_entries", "pins"
  add_foreign_key "pins", "users"
  add_foreign_key "user_collections", "collections"
  add_foreign_key "user_collections", "users"
  add_foreign_key "user_group_collections", "collections"
  add_foreign_key "user_group_collections", "user_groups"
  add_foreign_key "user_group_users", "user_groups"
  add_foreign_key "user_group_users", "users"
end
