Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resource :login
    get 'login/user', to: 'logins#user'
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

    namespace :admin do
      get 'organization/:id/role', to: 'organization#role'
      resources :organization do
        resources :space do
          resources :reservation
        end
        resources :user
      end
    end
  end

end
