@echo off
title SpacePulse Web Application
echo ========================================================
echo      SpacePulse - Launching Application
echo ========================================================
echo.
echo [1/2] Starting backend API service...
start "SpacePulse Backend" cmd /k "python -m backend.main"
timeout /t 3 /nobreak >nul
echo [2/2] Launching SpacePulse web dashboard...
start "" "http://localhost:8000"
echo.
echo SpacePulse is ready at http://localhost:8000 !
