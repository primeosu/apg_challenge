require 'rails_helper'

describe ClassificationType do

  it { should validate_presence_of(:name) }

  it { should validate_uniqueness_of(:name) }

  it { should have_many(:classifications) }
  it { should have_many(:malware).through(:classifications) }

end