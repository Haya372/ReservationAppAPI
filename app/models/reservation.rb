class Reservation < ApplicationRecord
  has_many :user_reservations, dependent: :delete_all
  has_many :users, through: :user_reservations
  belongs_to :space
end
