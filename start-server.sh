#!/usr/bin/bash

echo "Is there any server daemon running?"
forever_list=`forever list | wc -l`
if [ $forever_list -eq 1 ] ; then
    echo "No daemon running."
else
    echo "Shutting down previous version of server daemons..."
    forever stopall
fi

echo "Killing previous server screen..."
screen -X -S server quit

echo "Entering new deployed artefact"
cd /var/www/server/

echo "Starting new server in screen..."
screen -S server -d -m npm run start
