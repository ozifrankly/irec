class CreateDiagnostics < ActiveRecord::Migration
  def change
    create_table :diagnostics do |t|
      t.string :description

      t.timestamps null: false
    end

    add_column :students, :diagnostic_id, :integer 
  end
end
