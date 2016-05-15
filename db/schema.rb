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

ActiveRecord::Schema.define(version: 20160514183947) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "classification_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "malware_count", default: 0
  end

  add_index "classification_types", ["malware_count"], name: "index_classification_types_on_malware_count", using: :btree
  add_index "classification_types", ["name"], name: "index_classification_types_on_name", using: :btree

  create_table "classifications", force: :cascade do |t|
    t.string   "name"
    t.integer  "classification_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "classifications", ["classification_type_id"], name: "index_classifications_on_classification_type_id", using: :btree
  add_index "classifications", ["name"], name: "index_classifications_on_name", using: :btree

  create_table "file_types", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "file_types", ["name"], name: "index_file_types_on_name", using: :btree

  create_table "malware", force: :cascade do |t|
    t.string   "md5"
    t.integer  "size"
    t.integer  "classification_id"
    t.integer  "file_type_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "malware_import_id"
  end

  add_index "malware", ["classification_id"], name: "index_malware_on_classification_id", using: :btree
  add_index "malware", ["malware_import_id"], name: "index_malware_on_malware_import_id", using: :btree

  create_table "malware_imports", force: :cascade do |t|
    t.string   "file_id"
    t.boolean  "imported",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
