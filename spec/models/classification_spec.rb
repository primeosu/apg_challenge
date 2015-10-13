require 'rails_helper'

RSpec.describe Classification, type: :model do

  describe 'validations' do
    it 'has a valid factory' do
      expect(build(:classification)).to be_valid
    end

    it 'is invalid when threat_type is nil' do
      expect(build(:classification, threat_type: nil)).not_to be_valid
    end

    it 'is invalid when behavior is nil' do
      expect(build(:classification, behavior: nil)).not_to be_valid
    end
  end
end
