@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM 出力するファイル名を指定します
set OUTPUT_FILE=./output/study_logs.txt

REM ダウンロードフォルダのパスを指定します
set DOWNLOAD_FOLDER=%USERPROFILE%\Downloads

REM 出力フォルダが存在しない場合は作成します
if not exist "../logs" (
    mkdir "../logs"
)

REM 出力ファイルが既に存在する場合は追記モードで開きます
if exist "%OUTPUT_FILE%" (
    for %%i in ("%DOWNLOAD_FOLDER%\quiz_log*") do (
        type "%%i" >> "%OUTPUT_FILE%"
        echo.>>"%OUTPUT_FILE%"
        del "%%i"
    )
) else (
    REM 出力ファイルが存在しない場合は新規作成します
    type nul > "%OUTPUT_FILE%"
    for %%i in ("%DOWNLOAD_FOLDER%\quiz_log*") do (
        type "%%i" >> "%OUTPUT_FILE%"
        echo.>>"%OUTPUT_FILE%"
        del "%%i"
    )
)

echo ファイルのまとめが完了しました。

REM 以下の行で無限ループを作成し、プロンプトが閉じないようにします。
:loop
timeout /t 3600 /nobreak >nul
goto loop