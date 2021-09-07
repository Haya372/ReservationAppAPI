class ReservationCount < ActiveRecord::Base
  belongs_to :space
  validates :space_id, :uniqueness => {:scope => :date}

  def self.add(reservation)
    start_time = reservation.start_time
    date = format("%04d/%02d/%02d", start_time.year, start_time.month, start_time.day)
    reservation_count = ReservationCount.find_by(date: date, space_id: reservation.space_id)
    if reservation_count.blank?
      ReservationCount.create(date: date, space_id: reservation.space_id, total_numbers: 1)
    else
      reservation_count.increment!(:total_numbers, 1)
      reservation_count
    end
  end

  def self.remove(reservation)
    start_time = reservation.start_time
    date = format("%04d/%02d/%02d", start_time.year, start_time.month, start_time.day)
    reservation_count = ReservationCount.find_by(date: date, space_id: reservation.space_id)
    reservation_count.decrement!(:total_numbers, 1) if !reservation_count.blank?
  end
end