Rails.application.routes.draw do
  root to: 'malware_data#index'
  resources :malware_data
end
