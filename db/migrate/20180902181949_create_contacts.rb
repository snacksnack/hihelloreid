class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :name, null: false, :limit => 50
      t.string :email, null: false, :limit => 50
      t.string :subject, null: false, :limit => 50
      t.text   :message, null: false
    end
  end
end
