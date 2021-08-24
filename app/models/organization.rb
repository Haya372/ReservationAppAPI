class Organization < ApplicationRecord
  has_secure_password
  has_many :user_organizations
  has_many :users, through: :user_organizations
  has_many :organization_spaces
  has_many :spaces, through: :organization_spaces
end
