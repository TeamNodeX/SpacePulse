@echo off
title SpacePulse Backend Server (Team NodeX)
echo ========================================================
echo      SpacePulse - University of Moratuwa
echo      FastAPI Backend & Temporal Hysteresis Engine
echo ========================================================
echo.
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in system PATH.
    echo Please install Python 3.10+ from https://www.python.org
    pause
    exit /b 1
)
echo Starting SpacePulse FastAPI backend on http://127.0.0.1:8000 ...
echo Swagger Interactive Docs: http://127.0.0.1:8000/docs
echo.
python -m backend.main
pause
