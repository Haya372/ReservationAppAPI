class AddColumnColor < ActiveRecord::Migration[6.1]
  def up
    add_column :spaces, :color, :string
  end

  def down 
    remove_column :spaces, :color
  end
end
