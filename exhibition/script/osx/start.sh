pkill chrome
pkill node
cd ~/Documents/Projects/Ongoing/aerocene/aerocene_exhibition/aerocene
pwd
git pull
npm run build
cd exhibition
pwd
npm install
node index.js &
sleep 10
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk http://localhost:1337/#/server &
