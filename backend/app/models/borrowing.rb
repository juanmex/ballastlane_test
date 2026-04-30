class Borrowing < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :borrowed_at, presence: true
  validates :due_at,      presence: true

  validate :book_must_be_available, on: :create
  validate :user_must_be_member,    on: :create

  scope :active,   -> { where(returned_at: nil) }
  scope :returned, -> { where.not(returned_at: nil) }
  scope :overdue,  -> { active.where(due_at: ..Time.current) }

  def returned?
    returned_at.present?
  end

  private

  def book_must_be_available
    return unless book
    errors.add(:book, "is not available for borrowing") unless book.available?
  end

  def user_must_be_member
    return unless user
    errors.add(:user, "must be a Member to borrow books") unless user.member?
  end
end
