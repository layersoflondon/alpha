#!/usr/bin/env bash
echo "Adding Ubuntu box"
vagrant box add bento/ubuntu-14.04
echo "Bootstrapping with chef"
vagrant up