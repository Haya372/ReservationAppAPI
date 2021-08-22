class Organization < ApplicationRecord
  has_many :users, through: :user_organizations
  has_many :user_organizations
  has_many :spaces, through: :organization_spaces
  has_many :organization_spaces
end
