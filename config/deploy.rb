# Basic details
set :application, 'layers_of_london'
set :repo_url, 'git@github.com:layersoflondon/application'
set :primary_domain, "layersoflondon"

after 'deploy:updated', 'npm:install'