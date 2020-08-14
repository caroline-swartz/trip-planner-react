class Stop < ApplicationRecord
    belongs_to: trip

    validates :location, presence: true
    validates :budget, presence:true
    validates :start, presence: true
    validates :end, presence: true
    validates :accommodation, presence: true
end
