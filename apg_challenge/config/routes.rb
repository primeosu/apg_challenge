Rails.application.routes.draw do
  get 'items/info'
  post 'items/import'

  root 'items#info'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
