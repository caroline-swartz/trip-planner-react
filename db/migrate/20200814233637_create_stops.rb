class CreateStops < ActiveRecord::Migration[6.0]
  def change
    create_table :stops do |t|
      t.string :location
      t.date :start
      t.date :end
      t.integer :budget
      t.string :accommodation

      t.timestamps
    end
  end
end
