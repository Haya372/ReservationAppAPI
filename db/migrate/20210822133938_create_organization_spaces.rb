class CreateOrganizationSpaces < ActiveRecord::Migration[6.1]
  def change
    create_table :organization_spaces do |t|
      t.references :organization, index: true, foreign_key: true
      t.references :space, index: true, foreign_key: true
    end
  end
end
