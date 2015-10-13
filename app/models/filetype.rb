class Filetype < ActiveRecord::Base
  has_many :malware

  validates :extension, presence: true
end
