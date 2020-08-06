Rails.application.routes.draw do
  get 'trips/index'
  get 'trips/show'
  post 'trips/create'
  get 'trips/edit'
  get 'trips/destroy'
  post '/login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get 'users/index'
  post '/users/create'
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
