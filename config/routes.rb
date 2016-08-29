Rails.application.routes.draw do
  get 'welcome/index'

  resources :malwares do
    collection { post :upload }
  end

  post 'welcome/upload'

  get 'welcome/list'

  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
