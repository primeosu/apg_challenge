require 'rails_helper'

describe Classification do

  it { should validate_presence_of(:name) }

  it { should validate_uniqueness_of(:name) }

  it { should belong_to(:classification_type) }
  it { should have_many(:malware) }

end