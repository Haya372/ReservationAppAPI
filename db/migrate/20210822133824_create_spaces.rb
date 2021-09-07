class CreateSpaces < ActiveRecord::Migration[6.1]
  def change
    create_table :spaces do |t|
      t.string :name, null: false
      t.references :organization, index: true, foreign_key: true
      t.integer :capacity, null: false
      t.timestamps
    end
  end
end
