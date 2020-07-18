class User < ApplicationRecord
    validates :email, presence: true
    validates :firstname, presence: true
    validates :lastname, presence: true
    validates :password, presence: true 
end
