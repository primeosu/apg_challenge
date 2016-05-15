FactoryGirl.define do
  factory :classification_type do

    name { Faker::Lorem.word }

    factory :classification_type_with_classifications do
      classifications { build_list(:classification, Faker::Number.between(5, 10)) }
    end

  end
end