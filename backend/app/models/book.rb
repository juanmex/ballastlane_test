class Book < ApplicationRecord
  has_many :borrowings, dependent: :destroy

  validates :title,        presence: true
  validates :isbn,         presence: true, uniqueness: true
  validates :total_copies, numericality: { greater_than_or_equal_to: 0 }

  def available?
    !borrowings.active.exists?
  end
end
