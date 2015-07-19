class AddAttributesToStudents < ActiveRecord::Migration
  def change
    add_column :students, :crm, :integer
    add_column :students, :doctor, :string
  end
end
