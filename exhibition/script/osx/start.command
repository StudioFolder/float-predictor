pkill chrome
pkill node
pwd
dir=${0%/*}
cd "$dir"
cd ../../../
pwd
git pull
npm run build
cd exhibition
npm install
node index.js&
sleep 5
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:1337/#/server
