class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :password, presence: true, on: :update

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, {presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true}

  has_many :user_organizations, dependent: :delete_all
  has_many :organizations, through: :user_organizations
  has_many :reservations, dependent: :delete_all

  def belong_organization(organization_id)
    !UserOrganization.where(user_id: self.id).where(organization_id: organization_id).blank?
  end
end
