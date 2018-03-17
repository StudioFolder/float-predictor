taskkill /im node.exe
taskkill /im chrome.exe
cd C:\Users\username\Documents\aerocene\
git pull
npm install
npm run build
cd exhibition
start node server.js
timeout /t 10
start "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -kiosk -fullscreen http://localhost:1337/#/server
