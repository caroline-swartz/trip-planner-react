Rails.application.routes.draw do
  get 'stops/index'
  get 'stops/show'
  post 'stops/create'
  get 'stops/edit'
  get 'stops/destroy'
  get 'trips/index'
  post 'trips/create'
  get 'trips/edit'
  post 'trips/destroy'
  post '/login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  get 'users/index'
  post '/users/create'
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
