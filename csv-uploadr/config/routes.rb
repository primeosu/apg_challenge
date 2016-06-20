Rails.application.routes.draw do
  root to: 'defects#index'
  resources :defects
end
