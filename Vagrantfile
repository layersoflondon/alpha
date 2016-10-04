Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-14.04"

  config.vm.hostname = "layersoflondon.vagrant"

  config.vm.provision "chef_solo" do |chef|
    chef.cookbooks_path = "../chef/cookbooks"
    chef.roles_path = "../chef/roles/Error"
    chef.data_bags_path = "../chef/data_bags"
    chef.environments_path = "../chef/environments"
    chef.encrypted_data_bag_secret_key_path = '~/.chef-secret'
    chef.environment = "vagrant"
    chef.add_role "base"
    chef.add_role "dbserver"
    chef.add_role "elasticsearch"
  end

  config.vm.network "forwarded_port", guest: 9200, host: 9200
  config.vm.network "forwarded_port", guest: 3306, host: 3306
end