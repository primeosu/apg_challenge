class FileType < ActiveRecord::Base

  has_many :malware

  validates :name, presence: true

  validates_uniqueness_of :name

end