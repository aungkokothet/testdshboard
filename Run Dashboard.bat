@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required to run this dashboard.
  echo Please install Node.js LTS from https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dashboard dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)

echo Starting University Options Dashboard...
start "" http://localhost:5173/
call npm run dev -- --host 127.0.0.1

pause
