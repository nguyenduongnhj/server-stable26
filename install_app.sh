#!/bin/sh
# set -e 
. ~/.nvm/nvm.sh

ROOT_PATH="$PWD"
FOLDER_APPS_PATH="$PWD/apps"

rm -rf $FOLDER_APPS_PATH/spreed $FOLDER_APPS_PATH/tasks $FOLDER_APPS_PATH/calendar $FOLDER_APPS_PATH/deck $FOLDER_APPS_PATH/rickdocuments

nvm use 15.14.0

#wait
git clone https://github.com/kma-custom-nextcloud/tasks.git $FOLDER_APPS_PATH/tasks
cd $FOLDER_APPS_PATH/tasks
make

nvm use 14.14.0

#wait
git clone https://github.com/kma-custom-nextcloud/spreed.git $FOLDER_APPS_PATH/spreed
cd $FOLDER_APPS_PATH/spreed
make dev-setup
make build-js

#wait
git clone https://github.com/kma-custom-nextcloud/calendar.git $FOLDER_APPS_PATH/calendar
cd $FOLDER_APPS_PATH/calendar
make dev-setup
make build-js

#wait
git clone https://github.com/kma-custom-nextcloud/deck.git $FOLDER_APPS_PATH/deck
cd $FOLDER_APPS_PATH/deck
make install-deps
make build

#wait
git clone https://github.com/kma-custom-nextcloud/richdocuments.git $FOLDER_APPS_PATH/richdocuments
cd $FOLDER_APPS_PATH/richdocuments
npm ci
npm run dev
