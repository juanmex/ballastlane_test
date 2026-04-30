# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      USER_PARTIAL_MATCH = %i[name email].freeze

      def index
        scope = RecordFilterService.new(
          scope: User.order(:name),
          filters: params.permit(:name, :email, :role).to_h,
          partial_match_attributes: USER_PARTIAL_MATCH
        ).call
        render_paginated(scope)
      end
    end
  end
end
