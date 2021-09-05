class OrganizationSpace < ApplicationRecord
  belongs_to :organization
  belongs_to :space

  validates :organization_id, :uniqueness => {:scope => :space_id}
end
