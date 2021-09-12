class AddColumns < ActiveRecord::Migration[6.1]
  def up
    change_table :users do |t|
      t.string :image_url
    end

    change_table :organizations do |t|
      t.string :image_url, :description, :rule
      t.boolean :public, default: false
    end

    change_table :spaces do |t|
      t.string :image_url, :description, :rule
    end

    change_table :reservations do |t|
      t.string :memo
      t.boolean :admin_flg, default: false
    end
  end

  def down
    change_table :users do |t|
      t.remove :image_url
    end

    change_table :organizations do |t|
      t.remove :image_url, :description, :rule, :public
    end

    change_table :spaces do |t|
      t.remove :image_url, :description, :rule
    end

    change_table :reservations do |t|
      t.remove :memo, :admin_flg
    end
  end
end
