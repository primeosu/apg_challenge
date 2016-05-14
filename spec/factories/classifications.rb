FactoryGirl.define do

  factory :classification do

    name { Faker::Lorem.word }

    factory :classification_with_classification_type do
      classification_type { create(:classification_type) }
    end

    factory :classification_with_malware do
      malware { build_list(:malware, Faker::Number.between(5, 10)) }
    end

  end

end