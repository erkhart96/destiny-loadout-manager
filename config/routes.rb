Rails.application.routes.draw do
  resources :items
  resources :character_loadouts
  resources :loadouts
  devise_for :users, :controllers => {
                       :omniauth_callbacks => "users/omniauth_callbacks",
                     }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end
  # Defines the root path route ("/")
  root "users#home"
  post "/equip", to: "bungie#equip"
  get "/hello", to: "application#hello_world"
  get "/users", to: "users#index"
end
