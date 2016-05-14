Rails.application.routes.draw do

  root to: "classification_types#index"

  resources :classification_types, only: [:index]

  resources :malware_imports, only: [:new, :create]

end
