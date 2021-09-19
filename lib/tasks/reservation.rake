namespace :reservation do
  desc "古い予約を削除する"
  task delete_old_reservations: :environment do
    Reservation.where('end_time < ?', 1.months.ago).delete_all
  end
end

