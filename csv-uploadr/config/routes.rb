Rails.application.routes.draw do
  resources :defects do
    collection {post :upload}
  end
  root to: 'defects#index'
end
