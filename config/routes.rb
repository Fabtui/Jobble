Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get 'professional_update', to: 'users#professional_update'
  post 'job_update', to: 'users#job_update'
  post 'skill_update', to: 'users#skill_update'
  get 'profile', to: 'users#profile'
  get 'dashboard', to: 'users#dashboard'
  patch 'update_users', to: 'users#update_users'
  patch 'description_maj', to: 'users#description_maj'
  get 'matches', to: "offers#matches"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :messages, only: %i[show]

  resources :offers, only: %i[index show] do
    resources :matches, only: %i[create]
    post 'reject', to: 'matches#reject'
  end
end
