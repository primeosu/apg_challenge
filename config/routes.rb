Rails.application.routes.draw do
  root 'malware_files#index'
  get 'csv_upload', to: 'malware_files#new'
  post 'malware_files', to: 'malware_files#create'
end
