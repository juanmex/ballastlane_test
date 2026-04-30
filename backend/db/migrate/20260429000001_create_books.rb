class CreateBooks < ActiveRecord::Migration[8.1]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author
      t.string :genre
      t.string :isbn, null: false
      t.integer :total_copies, null: false, default: 0

      t.timestamps
    end

    add_index :books, :isbn, unique: true
  end
end
