Rails.application.routes.draw do
  get "up" => "health#show"

  namespace :api do
    namespace :v1 do
      resources :books
    end
  end
end
