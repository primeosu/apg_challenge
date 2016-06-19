#!/bin/bash
# update package cache
sudo yum update -y

# install required packages
sudo yum groupinstall 'Development Tools' -y

# epel-release required for nodejs
sudo yum install -y epel-release
sudo yum install -y ruby ruby-devel zlib-devel sqlite-devel nodejs

gem install bundler

# install Gemfile dependencies
bundle install

# initialize database
rake db:setup