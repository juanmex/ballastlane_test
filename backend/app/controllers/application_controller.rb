# frozen_string_literal: true

class ApplicationController < ActionController::API
  PAGY_DEFAULT_LIMIT = 25

  # Resolves the authenticated user from the X-User-Id request header.
  # Replace this with JWT token verification when auth is implemented.
  def current_user
    @current_user ||= User.find_by(id: request.headers['X-User-Id'])
  end

  def require_authentication!
    render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def render_paginated(scope)
    page  = [params[:page].to_i, 1].max
    limit = (params[:limit] || PAGY_DEFAULT_LIMIT).to_i

    pagy    = Pagy::Offset.new(count: scope.count, page: page, limit: limit)
    records = pagy.records(scope)

    render json: {
      data: records,
      meta: {
        current_page: pagy.page,
        total_pages: pagy.pages,
        total_count: pagy.count,
        limit: pagy.limit,
        from: pagy.from,
        to: pagy.to,
        prev_page: pagy.previous,
        next_page: pagy.next
      }
    }, status: :ok
  end
end
