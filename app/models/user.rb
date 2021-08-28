class User < ApplicationRecord
  has_secure_password

  has_many :roles, through: :user_roles
  has_many :user_roles, dependent: :delete_all
  has_many :organizations, through: :user_organizations
  has_many :user_organizations, dependent: :delete_all
  has_many :reservations, through: :user_reservations
  has_many :user_reservations, dependent: :delete_all

  def belong_organization(organization_id)
    !UserOrganization.where(user_id: self.id).where(organization_id: organization_id).blank?
  end
end
