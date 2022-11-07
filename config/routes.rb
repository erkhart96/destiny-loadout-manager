Rails.application.routes.draw do
  devise_for :users, :controllers => {
    :omniauth_callbacks => 'users/omniauth_callbacks'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get "/authorize" => "users/omniauth_callbacks#passthru"
  end
  # Defines the root path route ("/")
  # root "articles#index"

  get '/hello', to: 'application#hello_world'
end
