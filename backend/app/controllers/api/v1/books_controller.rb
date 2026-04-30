module Api
  module V1
    class BooksController < ApplicationController
      def index
        render_paginated(Book.all)
      end

      def show
        render json: { data: book }
      end

      def create
        book = Book.new(book_params)
        if book.save
          render json: { data: book }, status: :created
        else
          render json: { errors: book.errors }, status: :unprocessable_entity
        end
      end

      def update
        if book.update(book_params)
          render json: { data: book }
        else
          render json: { errors: book.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        book.destroy
        head :no_content
      end

      private

      def book
        @book ||= Book.find(params[:id])
      end

      def book_params
        params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies)
      end
    end
  end
end
