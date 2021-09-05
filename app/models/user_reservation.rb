class UserReservation < ApplicationRecord
  belongs_to :user
  belongs_to :reservation

  validates :user_id, :uniqueness => {:scope => :reservation_id}
end
