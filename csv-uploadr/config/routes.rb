Rails.application.routes.draw do
  root to: 'viruses#index'
  resources :viruses
end
