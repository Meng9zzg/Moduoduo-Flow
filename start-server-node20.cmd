@echo off
set PATH=D:\Soft\Soft Add\Node.js\nvm\v20.19.5;%PATH%
set PORT=8000
set DATABASE_PATH=./database.sqlite
set FLOWISE_USERNAME=admin
set FLOWISE_PASSWORD=admin123

cd packages\server
pnpm dev
