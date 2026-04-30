Rails.application.routes.draw do
  get "up" => "health#show"

  namespace :api do
    namespace :v1 do
      resources :books
      resources :users,     only: [:index]
      resources :borrowings, only: [:create, :update]
    end
  end
end
