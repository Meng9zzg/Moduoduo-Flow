@echo off
setlocal

REM Set Node 20 path FIRST in PATH
set "NODE20=D:\Soft\Soft Add\Node.js\nvm\v20.19.5"
set "PATH=%NODE20%;%PATH%"

echo ========================================
echo Rebuilding sqlite3 with Node 20
echo ========================================
echo.

echo Current Node version:
node --version
echo.

REM Set environment for Visual Studio 2022
set "GYP_MSVS_VERSION=2022"

echo Navigating to sqlite3 directory...
cd node_modules\.pnpm\sqlite3@5.1.7\node_modules\sqlite3

echo.
echo Cleaning old build...
if exist build rmdir /s /q build

echo.
echo Running node-gyp rebuild WITHOUT --target flag...
echo (This will use the current Node version automatically)
node "%NODE20%\node_modules\npm\bin\npx-cli.js" node-gyp rebuild --msvs_version=2022

echo.
if exist build\Release\node_sqlite3.node (
    echo ========================================
    echo SUCCESS! sqlite3 compiled successfully
    echo ========================================
) else (
    echo ========================================
    echo FAILED! Check errors above
    echo ========================================
)
