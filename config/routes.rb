Rails.application.routes.draw do
  get 'malware/index'
  post 'malware/upload'

  root 'malware#index'
end
