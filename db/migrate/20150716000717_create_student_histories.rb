class CreateStudentHistories < ActiveRecord::Migration
  def change
    create_table :student_histories do |t|
      t.belongs_to :student, index: true
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
