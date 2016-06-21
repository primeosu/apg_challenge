Rails.application.routes.draw do
  resources :defects do
    collection {post :import}
  end
  root to: 'defects#index'
end
