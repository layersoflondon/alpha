# Basic details
set :application, 'layers_of_london'
set :repo_url, 'git@github.com:layersoflondon/application'
set :primary_domain, "www.layersoflondon.org"

after 'deploy:updated', 'npm:install'