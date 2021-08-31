class Reservation < ApplicationRecord

  validates :numbers, presence: true, on: :update

  has_many :user_reservations, dependent: :delete_all
  has_many :users, through: :user_reservations
  belongs_to :space
  belongs_to :user

  scope :common_part, -> space_id, start_time, end_time {
    where('space_id = ?', space_id).where.not('start_time >= ?', end_time).where.not('end_time <= ?', start_time)
  }

  scope :common_part_in_organization, -> organization_id, start_time, end_time {
    eager_load(space: :organizations).where('organizations.id = ?', organization_id).where.not('start_time >= ?', end_time).where.not('end_time <= ?', start_time)
  }
end
