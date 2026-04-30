class User < ApplicationRecord
  has_secure_password

  has_many :borrowings, dependent: :destroy

  enum :role, { member: 'member', librarian: 'librarian' }, validate: true

  validates :name,  presence: true
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :role,  presence: true

  def as_json(options = {})
    super(options.merge(except: :password_digest))
  end
end
