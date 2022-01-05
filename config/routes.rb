Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  resources :users do
    collection do
      get :new_user_skills
      post :create_user_skills
      get :dashboard
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:show, :update]
end
