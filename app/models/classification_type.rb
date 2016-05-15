class ClassificationType < ActiveRecord::Base

  has_many :classifications
  has_many :malware, through: :classifications

  validates :name, presence: true

  validates_uniqueness_of :name

end