@echo off
set PATH=D:\Soft\Soft Add\Node.js\nvm\v20.19.5;%PATH%
echo Using Node version:
node --version
echo.
echo Installing sqlite3 with Node 20...
cd packages\server
pnpm install sqlite3 --force
