Rails.application.routes.draw do
  get '/login', to: 'login#index'
  get 'users/index'
  post 'users/create'
  get '/dashboard/:id', to: 'users#show'
  delete '/delete-account/:id', to: 'users#destroy'
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
