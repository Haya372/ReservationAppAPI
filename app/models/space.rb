class Space < ApplicationRecord
  validates :name, presence: true, on: :update
  has_many :reservations, dependent: :delete_all
  has_many :organization_spaces, dependent: :delete_all
  has_many :organizations, through: :organization_spaces

  scope :belong_organization, -> organization_id {
    joins(:organizations).where('organizations.id = ?', organization_id)
  }

  scope :with_organization, -> {
    columns = "spaces.*,"
    Organization.show_attributes.each {|attr|
      columns += "organizations." +attr + " as organization_" + attr + ","
    }
    joins(:organizations).select(columns.chop)
  }

  def self.show_attributes
    ["id", "name", "capacity"]
  end
end
