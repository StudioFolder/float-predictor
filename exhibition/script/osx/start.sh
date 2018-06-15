pkill chrome
pkill node
cd ../../../
pwd
git pull
npm run build
cd exhibition
pwd
npm install
node index.js&
sleep 5
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:1337/#/server
