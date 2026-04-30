class BorrowBookService
  Result = Struct.new(:success?, :borrowing, :errors, keyword_init: true)

  LOAN_PERIOD = 2.weeks

  def initialize(user:, book:)
    @user = user
    @book = book
  end

  def call
    ActiveRecord::Base.transaction do
      borrowing = Borrowing.create!(
        user:        @user,
        book:        @book,
        borrowed_at: Time.current,
        due_at:      Time.current + LOAN_PERIOD
      )
      Result.new(success?: true, borrowing: borrowing, errors: [])
    end
  rescue ActiveRecord::RecordInvalid => e
    Result.new(success?: false, borrowing: nil, errors: e.record.errors.full_messages)
  rescue ActiveRecord::RecordNotUnique
    Result.new(success?: false, borrowing: nil, errors: ["User already have an active borrowing for this book"])
  end
end
