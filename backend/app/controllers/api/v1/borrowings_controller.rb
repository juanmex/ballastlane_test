# frozen_string_literal: true

module Api
  module V1
    class BorrowingsController < ApplicationController
      before_action :require_authentication!

      def create
        book = Book.find(params[:book_id])
        user = User.find(params[:id])
        result = BorrowBookService.new(user: user, book: book).call

        if result.success?
          render json: { data: result.borrowing }, status: :created
        else
          render json: { errors: result.errors }, status: :unprocessable_entity
        end
      end

      def update
        return render json: { error: 'Forbidden: only Librarians can mark books as returned' }, status: :forbidden \
          unless current_user.librarian?

        borrowing = Borrowing.active.find(params[:id])

        borrowing.update!(returned_at: Time.current)
        render json: { data: borrowing }, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Borrowing not found or already returned' }, status: :not_found
      end
    end
  end
end
