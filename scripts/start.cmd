@echo off
REM Production server. Node was installed during this session, so processes
REM spawned from an older shell do not have it on PATH yet.
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0.."
call npm run start
