cd ..\..\..\
cd
taskkill /im node.exe
taskkill /im chrome.exe
timeout /t 5
git pull
cmd.exe /c npm install
timeout /t 5
cmd.exe /c npm run build
timeout /t 5
cd exhibition\
cmd.exe /c npm install
timeout /t 5
start node index.js
timeout /t 20
start chrome.exe --kiosk --fullscreen http://localhost:1337/#/server
