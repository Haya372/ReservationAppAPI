Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resource :login
    namespace :user do
      resources :reservation, only: [:index]
    end
    resources :user
    resources :organization do
      scope module: :organization do
        resources :space do
          resources :reservation
        end
      end

      scope module: :organization do
        resources :user, only: [:index]
        resources :reservation, only: [:index]
        resources :role, except: [:update]
      end
    end

    resources :space, only: [:show, :update, :destroy]
    resources :reservation, only: [:show, :update, :destroy]
  end

end
