class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :password, presence: true, on: :update

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, {presence: true, format: { with: VALID_EMAIL_REGEX }}

  has_many :user_roles, dependent: :delete_all
  has_many :roles, through: :user_roles
  has_many :user_organizations, dependent: :delete_all
  has_many :organizations, through: :user_organizations
  has_many :user_reservations, dependent: :delete_all
  has_many :reservations, through: :user_reservations

  def belong_organization(organization_id)
    !UserOrganization.where(user_id: self.id).where(organization_id: organization_id).blank?
  end
end
