class Organization < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :name, presence: true, on: :create
  validates :password, presence: true, on: :update

  has_many :user_organizations, dependent: :delete_all
  has_many :users, through: :user_organizations
  has_many :organization_spaces, dependent: :delete_all
  has_many :spaces, through: :organization_spaces, dependent: :delete_all
  has_many :user_roles, dependent: :delete_all
end
