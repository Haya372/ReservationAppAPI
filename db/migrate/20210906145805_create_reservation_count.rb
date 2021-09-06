class CreateReservationCount < ActiveRecord::Migration[6.1]
  def change
    create_table :reservation_counts do |t|
      t.references :space, index: true, foreign_key: true
      t.string :date, null: false, index: true
      t.integer :total_numbers
      t.timestamps
    end
  end
end
