class ApplicationController < ActionController::API
  PAGY_DEFAULT_LIMIT = 25

  def render_paginated(scope)
    page  = [params[:page].to_i, 1].max
    limit = (params[:limit] || PAGY_DEFAULT_LIMIT).to_i

    pagy    = Pagy::Offset.new(count: scope.count, page: page, limit: limit)
    records = pagy.records(scope)

    render json: {
      data: records,
      meta: {
        current_page: pagy.page,
        total_pages:  pagy.pages,
        total_count:  pagy.count,
        limit:        pagy.limit,
        from:         pagy.from,
        to:           pagy.to,
        prev_page:    pagy.previous,
        next_page:    pagy.next
      }
    }, status: :ok
  end
end
