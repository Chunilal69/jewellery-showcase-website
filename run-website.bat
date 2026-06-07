@echo off
title Shyam Jewellers Website Launcher
echo ===================================================
echo   Starting Shyam Jewellers Website
echo ===================================================
echo.

echo [1/3] Checking for Node.js...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Node.js is not installed or not in your PATH!
    echo Please download and install Node.js from https://nodejs.org/
    echo Once installed, double-click this file again.
    echo.
    pause
    exit /b
)

echo [2/3] Installing/Updating dependencies...
echo (This may take a minute on the first run)
call npm install
echo.

echo [3/3] Starting the local server and opening your browser...
echo.
echo The website should open automatically in your browser.
echo If it doesn't, navigate to http://localhost:3000
echo.
echo ===================================================
echo Press Ctrl+C in this window to stop the server.
echo ===================================================
echo.

call npm run dev -- --open
