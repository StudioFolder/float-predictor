taskkill /im node.exe
taskkill /im chrome.exe
cd C:\Users\Saraceno\aerocene\
git pull
npm install
cd exhibition\
npm install
cd ..
npm run build
cd exhibition\
start node index.js
timeout /t 10
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -kiosk -fullscreen http://localhost:1337/#/server
