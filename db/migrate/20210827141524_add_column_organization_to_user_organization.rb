class AddColumnOrganizationToUserOrganization < ActiveRecord::Migration[6.1]
  def change
    add_reference :user_roles, :organization, null: false, foreign_key: true
  end
end
