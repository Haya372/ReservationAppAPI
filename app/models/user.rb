class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :password, presence: true, on: :update

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, {presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: true}

  has_many :user_organizations, dependent: :delete_all
  has_many :organizations, through: :user_organizations
  has_many :reservations, dependent: :delete_all

  scope :show_params, -> {
    columns = ''
    User.show_attributes.each {|attr|
      columns += "users.#{attr} as #{attr},"
    }
    select(columns.chop)
  }

  def self.search(search = "")
    search = "" if search.blank?
    keyword = sanitize_sql_like(search) + '%'
    self.show_params.where('users.name like ?', keyword)
          .or(self.show_params.where('users.kana like ?', keyword))
  end

  def organization_with_role(search = "")
    keyword = ActiveRecord::Base.sanitize_sql_like(search) + '%'
    columns = 'user_organizations.role as role,'
    Organization.show_attributes.each {|attr|
      columns += "organizations." + attr + " as organization_" + attr + ","
    }
    self.organizations.select(columns.chop).where('organizations.name like ?', keyword).where('role && ARRAY[?]::varchar[]', ["create", "read", "update", "delete"])
  end

  def self.with_role(user_id, organization_id)
    sql = sanitize_sql(['organizations.id = ?', organization_id])
    columns = 'user_organizations.role as role,'
    User.show_attributes.each {|attr|
      columns += "users." + attr + " as " + attr + ","
    }
    User.joins(:organizations).select(columns.chop).where(sql).find_by(id: user_id)
  end

  def belong_organization(organization_id)
    !UserOrganization.where(user_id: self.id).where(organization_id: organization_id).blank?
  end

  def has_role?(organization_id, action)
    user_organization = UserOrganization.where(user_id: self.id).find_by(organization_id: organization_id)
    role = nil
    case action
    when "destroy" then
      role = "delete"
    when "update", "create" then
      role = action
    else
      role = "read"
    end
    if user_organization.blank?
      false
    else
      !user_organization.role.find{|r| r == role}.blank?
    end
  end

  def self.show_attributes
    ["id", "name", "kana", "email", "image_url"]
  end

end
