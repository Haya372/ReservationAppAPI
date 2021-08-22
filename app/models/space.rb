class Space < ApplicationRecord
  has_many :reservations
  has_many :organizations, through: :organization_spaces
  has_many :organization_spaces
end
