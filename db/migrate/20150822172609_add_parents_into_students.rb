class AddParentsIntoStudents < ActiveRecord::Migration
  def change
    add_column :students, :father, :string
    add_column :students, :mother, :string
  end
end
