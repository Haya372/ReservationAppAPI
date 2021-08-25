class Reservation < ApplicationRecord
  has_many :user_reservations, dependent: :delete_all
  has_many :users, through: :user_reservations
  belongs_to :space

  scope :common_part, -> space_id, start_time, end_time {
    where('space_id = ?', space_id).where.not('start_time > ?', end_time).where.not('end_time < ?', start_time)
  }
end
