@echo off
REM Node was installed during this session, so processes spawned from a shell
REM started earlier do not have it on PATH yet. Prepend it explicitly.
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0.."
call npm run dev
