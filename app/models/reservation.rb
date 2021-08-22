class Reservation < ApplicationRecord
  has_many :users, through: :user_reservations
  has_many :user_reservations
  belongs_to :space
end
