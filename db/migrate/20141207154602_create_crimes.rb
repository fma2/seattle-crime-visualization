class CreateCrimes < ActiveRecord::Migration
  def change
    create_table :crimes do |t|
      t.string :cad_event_number
      t.string :cad_cdw_id
      t.string :zone_beat
      t.string :initial_type_description
      t.string :district_sector
      t.string :initial_type_subgroup
      t.string :longitude
      t.string :latitude
      t.string :hundred_block_location
      t.string :general_offense_number
      t.string :at_scene_time
      t.string :initial_type_group
      t.string :census_tract

      t.timestamps
    end
  end
end
