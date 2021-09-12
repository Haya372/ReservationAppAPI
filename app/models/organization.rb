class Organization < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :name, presence: true, on: :create
  # validates :password, presence: true, on: :update

  has_many :user_organizations, dependent: :delete_all
  has_many :users, through: :user_organizations
  has_many :spaces, dependent: :delete_all

  scope :show_params, -> {
    columns = ''
    Organization.show_attributes.each {|attr|
      columns += attr + ','
    }
    select(columns.chop)
  }

  def self.show_attributes
    ["id", "name", "description", "rule", "public"]
  end

  def self.search_user(organization_id, search)
    search = "" if search.nil?
    keyword = sanitize_sql_like(search) + "%"
    self.find(organization_id).users.select(:id, :name, :kana).where('kana like ?', keyword)
                    .or(self.find(organization_id).users.select(:id, :name, :kana).where('name like ?', keyword))
  end

  def self.search(search)
    search = "" if search.blank?
    keyword = sanitize_sql_like(search) + "%"
    self.select(:id, :name).where('name like ?', keyword)
  end

  def self.search_reservation_count(organization_id, keyword)
    keyword = sanitize_sql_like(keyword) + '%'
    self.find(organization_id).spaces.joins(:reservation_counts).select('reservation_counts.*').where('reservation_counts.date like ?', keyword)
  end

  def user_with_role(search = "")
    keyword = ActiveRecord::Base.sanitize_sql_like(search) + '%'
    columns = 'user_organizations.role as role,'
    User.show_attributes.each {|attr|
      columns += "users." +attr + " as user_" + attr + ","
    }
    self.users.select(columns.chop).where('users.name like ?', keyword)
          .or(users.select(columns.chop).where('users.kana like ?', keyword))
  end
end
