class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.string :name
      t.float :budget
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
