class CreateUserReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_reservations do |t|
      t.references :user, index: true, foreign_key: true
      t.references :reservation, index: true, foreign_key: true
    end
  end
end
