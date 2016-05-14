FactoryGirl.define do

  factory :file_type do

    name { Faker::Lorem.characters(3) }

  end

end