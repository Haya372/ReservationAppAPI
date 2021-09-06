class Organization < ApplicationRecord
  has_secure_password

  validates :name, presence: true, on: :update
  validates :name, presence: true, on: :create
  validates :password, presence: true, on: :update

  has_many :user_organizations, dependent: :delete_all
  has_many :users, through: :user_organizations
  has_many :spaces, dependent: :delete_all

  scope :show_params, -> {
    select(:id, :name)
  }

  def self.show_attributes
    ["id", "name"]
  end
end
