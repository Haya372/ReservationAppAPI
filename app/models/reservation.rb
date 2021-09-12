class Reservation < ApplicationRecord

  validates :numbers, presence: true, on: :update
  validate :validate_start_time
  validate :validate_end_time
  validate :validate_numbers_on_create, on: :create
  validate :validate_numbers_on_update, on: :update

  belongs_to :user
  belongs_to :space

  scope :common_part, -> space_id, start_time, end_time {
    where('space_id = ?', space_id).where.not('start_time >= ?', end_time).where.not('end_time <= ?', start_time)
  }

  scope :common_part_in_organization, -> organization_id, start_time, end_time {
    eager_load(space: :organization).where('organizations.id = ?', organization_id).where.not('start_time >= ?', end_time).where.not('end_time <= ?', start_time)
  }

  scope :with_organization, -> {
    columns = "reservations.*, "
    Space.show_attributes.each {|attr|
      columns += "spaces." +attr + " as space_" + attr + ","
    }
    Organization.show_attributes.each {|attr|
      columns += "organizations." +attr + " as organization_" + attr + ","
    }
    joins(:space, space: :organization).select(columns.chop)
  }

  def validate_start_time
    p self.start_time, DateTime.now
    errors.add(:start_time, "は１ヶ月以内に設定してください", strict: true) if self.start_time > 1.month.from_now
    errors.add(:start_time, "は過去に設定できません", strict: true) if self.start_time < DateTime.now
  end

  def validate_end_time
    errors.add(:end_time, "は開始時間より後にしてください", strict: true) if self.start_time >= self.end_time
  end

  def validate_numbers_on_create
    capacity = Space.find(self.space_id).capacity
    common = Reservation.common_part(self.space_id, self.start_time, self.end_time).sum(:numbers)
    errors.add(:numbers, "予約がいっぱいです", strict: true) if common + self.numbers > capacity
  end

  def validate_numbers_on_update
    capacity = Space.find(self.space_id).capacity
    common = Reservation.common_part(self.space_id, self.start_time, self.end_time).sum(:numbers)
    old = Reservation.find(self.id).numbers
    errors.add(:numbers, "予約制限がいっぱいです", strict: true) if common - old + self.numbers > capacity
  end
end
