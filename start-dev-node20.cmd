@echo off
setlocal

REM Set Node 20 path
set "NODE_PATH=D:\Soft\Soft Add\Node.js\nvm\v20.19.5"
set "PATH=%NODE_PATH%;%PATH%"

echo ========================================
echo Starting Flowise Development Server
echo ========================================
echo.

echo Checking Node version...
"%NODE_PATH%\node.exe" --version
echo.

echo Setting environment variables...
set PORT=8000
set DATABASE_PATH=./database.sqlite
set FLOWISE_USERNAME=admin
set FLOWISE_PASSWORD=admin123
echo Environment configured
echo.

echo Starting server...
cd packages\server
"%NODE_PATH%\node.exe" bin\run start

pause
