Vagrant.configure(2) do |config|
  config.vm.box = "debian/contrib-jessie64"
  config.vm.network "private_network", ip: "192.168.33.13"
  config.vm.hostname = "apg.dev"
  config.hostsupdater.aliases = ["apg.dev"]

  config.vm.synced_folder '.', '/srv/web', create: true
  config.vm.synced_folder "./vagrant/config/", "/var/config_files", create: true
  config.vm.synced_folder "./vagrant/sqldump/", "/var/sqldump", create: true

  config.vm.provision :shell, path: "vagrant/bootstrap.sh"
  config.vm.provision :shell, run: "always", path: "vagrant/load.sh"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
end
