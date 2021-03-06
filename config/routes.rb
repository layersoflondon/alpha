Rails.application.routes.draw do
  get 'pins/flag'

  get 'overlays/flag'

  devise_for :users,
             controllers: {registrations: 'registrations', sessions: 'sessions', invitations: 'invitations'}
  #         IMPORTANT: this is a greedy catchall route - it needs to be the last route in the file.
  devise_scope :user do
    get 'users/join_team', to: 'registrations#join_team'
    post 'users/join_team', to: 'registrations#join_team'
  end

  resources :contact_forms, only: :create

  resources :maps, only: [:index, :show, :create, :update], defaults: {format: :json} do
    collection do
      get 'search'
      get 'download/:content_entry_id', action: :download
    end
  end

  resources :collections, only: [:index, :show, :create], defaults: {format: :json} do
    collection do
      get 'search'
    end
  end

  resources :georeferenced_images, only: :index, defaults: {format: :json}

  resources :user_groups, except: [:new] do
    member do
      post 'invite', as: "invite_user_to"
      post 'accept', as: "accept_invitation_to"
      post 'reject', as: "reject_invitation_to"
      post 'remove', as: "remove_invitation_to"
      post 'request_invite', as: "request_invitation_to"
      post 'approve_request', as: "approve_request_to_join"
      post 'reject_request', as: "reject_request_to_join"
    end

    collection do
      post 'request_invite', as: "request_invitation_to"
    end
  end

  post "/overlays/*id/flag", to: "overlays#flag", as: :flag_overlay, defaults: {format: :json}

  resources :pins, only: [:update] do
    member do
      post :flag
    end
  end

  resources :posts, only: [:show], path: 'blog'

  mount Rooftop::Rails::Engine => "/rooftop"

  match "/undefined", via: :get, to: "application#tmp"

  match "/*nested_path", via: [:get], to: "pages#show", as: :page
  root to: "pages#index"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
