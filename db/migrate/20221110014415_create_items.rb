class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.integer :item_hash, :limit => 8
      t.integer :item_instance, :limit => 8

      t.timestamps
    end
  end
end
