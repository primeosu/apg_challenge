class Classification < ActiveRecord::Base
  has_many :malware

  validates :behavior, :threat_type, presence: true
end
