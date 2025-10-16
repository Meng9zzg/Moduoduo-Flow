@echo off
setlocal

REM Set Node 20 path
set "NODE_PATH=D:\Soft\Soft Add\Node.js\nvm\v20.19.5"
set "PATH=%NODE_PATH%;%PATH%"

REM Set Visual Studio and Windows SDK paths
set "GYP_MSVS_VERSION=2022"
set "WindowsSDKVersion=10.0.26100.0\"

echo ========================================
echo Rebuilding sqlite3 with Node 20
echo ========================================
echo.

echo Node version:
"%NODE_PATH%\node.exe" --version
echo.

echo Navigating to sqlite3 directory...
cd node_modules\.pnpm\sqlite3@5.1.7\node_modules\sqlite3

echo.
echo Running node-gyp rebuild...
"%NODE_PATH%\node.exe" "%NODE_PATH%\node_modules\npm\bin\npx-cli.js" node-gyp rebuild --msvs_version=2022

echo.
echo ========================================
echo Done!
echo ========================================
