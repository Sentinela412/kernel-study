@echo off
title Thea Study - Examenes Tipo Test
echo ============================================================
echo        Iniciando Thea Study - Examenes Tipo Test
echo ============================================================
echo.
cd /d "%~dp0"
echo [1/2] Entrando a la carpeta del proyecto...
echo [2/2] Levantando servidor local y abriendo tu navegador...
echo.
echo Presiona Ctrl+C o cierra esta ventana cuando quieras detenerlo.
echo.
npm run dev
pause
