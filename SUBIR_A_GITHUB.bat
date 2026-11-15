@echo off
title Subir Kernel Study a GitHub
echo ============================================================
echo           Subiendo Kernel Study a tu GitHub
echo ============================================================
echo.
cd /d "%~dp0"
echo [1/2] Entrando a la carpeta del proyecto...
echo [2/2] Enviando archivos a https://github.com/Sentinela412/kernel-study.git ...
echo.
echo Si te aparece una ventanita de GitHub en pantalla,
echo haz clic en "Sign in with your browser" para autorizar.
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ============================================================
    echo           SUBIDO CON EXITO A GITHUB!
    echo ============================================================
    echo Ahora ya puedes ir a vercel.com e importar el repositorio.
) else (
    echo.
    echo Si fallo la subida, comprueba tu conexion o usuario.
)
pause
