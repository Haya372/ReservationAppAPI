Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resource :login
    namespace :user do
      resources :reservation, only: [:index]
      resources :organization, only: [:index, :destroy]
      post 'organization/:id', to: 'organization#join_organization'
    end
    resources :user
    resources :organization do
      scope module: :organization do
        resources :space do
          scope module: :space do
            resources :reservation
          end
        end

        resources :user, only: [:index]
        resources :reservation, only: [:index]
        resources :reservation_cnt, only: [:index]
      end
    end

    resources :space, only: [:show, :update, :destroy] do
      scope module: :space do
        resources :reservation
      end
    end
    resources :reservation, only: [:show, :update, :destroy]
  end

end
