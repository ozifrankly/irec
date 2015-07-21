class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.string :name
      t.belongs_to :service_type

      t.timestamps null: false
    end
  end
end
