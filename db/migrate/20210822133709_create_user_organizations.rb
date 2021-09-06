class CreateUserOrganizations < ActiveRecord::Migration[6.1]
  def change
    create_table :user_organizations do |t|
      t.references :user, index: true, foreign_key: true
      t.references :organization, index: true, foreign_key: true
      t.string :role, null: false, array: true
    end
  end
end
