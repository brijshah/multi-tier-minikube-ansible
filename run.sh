#!/bin/bash

exit-failure() {
    printf "$@"
    exit 5
}

BOOTSTRAP=$1
DEPLOY=$2

which pip2 || apt-get install -y python-pip || exit-failure "pip failed to install."
which ansible || pip install ansible || exit-failure "ansible failed to install."
ansible-playbook -i localhost deploy_todo_app.yml -e "bootstrap=$BOOTSTRAP deploy=$DEPLOY" --become || exit-failure "playbook failed to complete successfuly."
