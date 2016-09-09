require 'rails_helper'

RSpec.describe Filetype, type: :model do

  describe 'validations' do
    it 'has a valid factory' do
      expect(build(:filetype)).to be_valid
    end

    it 'is invalid when extension is nil' do
      expect(build(:filetype, extension: nil)).not_to be_valid
    end
  end
end
