class AddTripToStops < ActiveRecord::Migration[6.0]
  def change
    add_reference :stops, :trip, null: false, foreign_key: true
  end
end
