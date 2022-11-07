class CreateCharacterLoadouts < ActiveRecord::Migration[7.0]
  def change
    create_table :character_loadouts do |t|
      t.integer :loadout_id
      t.integer :user_id

      t.timestamps
    end
  end
end
