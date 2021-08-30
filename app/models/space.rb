class Space < ApplicationRecord
  validates :name, presence: true, on: :update
  has_many :reservations, dependent: :delete_all
  has_many :organization_spaces, dependent: :delete_all
  has_many :organizations, through: :organization_spaces

  scope :belong_organization, -> organization_id {
    joins(:organizations).where('organizations.id = ?', organization_id)
  }
end
