class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name, index: true
      t.string :cpf, index: true
      t.string :doc, index: true
      t.date :birthday

      t.timestamps null: false
    end
  end
end
