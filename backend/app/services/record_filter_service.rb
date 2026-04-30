class RecordFilterService
  STRING_TYPES = %i[string text].freeze

  def initialize(scope:, filters:, partial_match_attributes: [])
    @model                   = scope.klass
    @scope                   = scope
    @filters                 = filters.stringify_keys
    @partial_match_attributes = partial_match_attributes.map(&:to_s)
    @columns_hash            = @model.columns_hash
    @quoted_table            = @model.quoted_table_name
    @connection              = @model.connection
  end

  def call
    @filters.reduce(@scope) do |memo, (column, value)|
      next memo if skip?(column, value)
      apply_filter(memo, column, value)
    end
  end

  private

  def skip?(column, value)
    !@columns_hash.key?(column) || value.nil? || value.to_s.strip.empty?
  end

  def apply_filter(scope, column, value)
    if partial_match?(column)
      scope.where(ilike_clause(column), "%#{escape_ilike(value)}%")
    else
      scope.where(column => value)
    end
  end

  def partial_match?(column)
    @partial_match_attributes.include?(column) &&
      STRING_TYPES.include?(@columns_hash[column].type)
  end

  # Builds a fully quoted "table"."column" ILIKE ? clause.
  # Column name is quoted by the connection adapter — no string interpolation of user input.
  def ilike_clause(column)
    quoted_column = @connection.quote_column_name(column)
    "#{@quoted_table}.#{quoted_column} ILIKE ?"
  end

  # Escapes ILIKE meta-characters so user input cannot alter the match pattern.
  def escape_ilike(value)
    value.to_s.gsub(/[%_\\]/) { "\\#{_1}" }
  end
end
