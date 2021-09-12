class Space < ApplicationRecord
  validates :name, presence: true, on: :update
  validate :validate_capacity_on_update, on: :update
  has_many :reservations, dependent: :delete_all
  belongs_to :organization
  has_many :reservation_counts, dependent: :delete_all

  scope :belong_organization, -> organization_id {
    joins(:organizations).where('organizations.id = ?', organization_id)
  }

  scope :with_organization, -> {
    columns = "spaces.*,"
    Organization.show_attributes.each {|attr|
      columns += "organizations." +attr + " as organization_" + attr + ","
    }
    joins(:organization).select(columns.chop)
  }

  def self.show_attributes
    ["id", "name", "capacity", "description", "rule"]
  end

  def validate_capacity_on_update
    old = Space.find(self.id).capacity
    if old > self.capacity
      now = DateTime.now
      reservations = Reservation.where(space_id: self.id).where('start_time >= ?', now)
      errors.add(:capacity, "予約が入っているため変更できません", strict: true) if !reservations.blank?
    end
  end
end
