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

ActiveRecord::Schema.define(version: 20141207154602) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crimes", force: true do |t|
    t.string   "cad_event_number"
    t.string   "cad_cdw_id"
    t.string   "zone_beat"
    t.string   "initial_type_description"
    t.string   "district_sector"
    t.string   "initial_type_subgroup"
    t.string   "longitude"
    t.string   "latitude"
    t.string   "hundred_block_location"
    t.string   "general_offense_number"
    t.string   "at_scene_time"
    t.string   "initial_type_group"
    t.string   "census_tract"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
