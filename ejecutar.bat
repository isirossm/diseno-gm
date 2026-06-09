@echo off
chcp 65001 > nul
title Servidor Local - Walmart Chile Diseno GM
cd /d "C:\Users\HP OMNIBOOK\Desktop\Walmart Chile Diseño GM"
echo Iniciando servidor local a traves de PowerShell...
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\HP OMNIBOOK\Desktop\Walmart Chile Diseño GM\server.ps1"
pause
