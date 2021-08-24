class User < ApplicationRecord
  has_secure_password
  
  has_many :roles, through: :user_roles
  has_many :user_roles
  has_many :organizations, through: :user_organizations
  has_many :user_organizations
  has_many :reservations, through: :user_reservations
  has_many :user_reservations
end
