class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role
  belongs_to :organization
  validates :user_id, :uniqueness => {:scope => :organization_id}
end
