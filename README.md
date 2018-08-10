Minikube Setup to run React/Restify/MongoDB Web Application
========

Requirements
-------
- Ubuntu Xenial 16.04
- Docker
- Virtualbox
- Minikube
- Kubectl
- Pip
- Ansible

Notes
-------
- Once the application is deployed, enter the following URL into the browser: http://192.168.99.100:30003
- A shell script is provided which will install the requirements listed above for you and run an ansible playbook to deploy to minikube


Steps:
-------
1) to bootstrap your Ubuntu environment and deploy the application, run `./run.sh yes true`
2) to skip bootstraping and deploying the application, run `./run.sh no true`
3) to teardown minikube once finished, run `./run.sh no false`

