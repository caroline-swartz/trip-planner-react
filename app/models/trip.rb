class Trip < ApplicationRecord
    belongs_to :user

    validates :name, presence: true
    validates :budget, presence:true
    validates :start, presence: true
    validates :end, presence: true
end
