Rails.application.routes.draw do

  root to: "classification_types#index"

  resources :classification_types, only: [:index]

  get 'classification_types/datatable_ajax'

  resources :malware_imports, only: [:new, :create]

end
