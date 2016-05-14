class Classification < ActiveRecord::Base

  has_many :malware
  belongs_to :classification_type

  validates :name, presence: true

  validates_uniqueness_of :name

end