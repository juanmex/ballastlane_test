class Book < ApplicationRecord
  validates :title, presence: true
  validates :isbn, presence: true, uniqueness: true
  validates :total_copies, numericality: { greater_than_or_equal_to: 0 }
end
