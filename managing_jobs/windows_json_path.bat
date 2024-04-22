@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

set /p "input=フォルダのパスを入力してください: "

if not exist "%input%" (
    echo パスが見つかりませんでした。
    exit /b 1
)

set "outputFile=output\json_path.txt"
type nul > "%outputFile%"

call :processFolder "%input%"
goto :eof

:processFolder
for /r "%~1" %%i in (*.json) do (
    echo %%i>>"%outputFile%"
)
goto :eof
