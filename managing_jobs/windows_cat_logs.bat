@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM Prompt the user to input their name
echo Enter your username:
set /p USERNAME=

REM Specify the output file name
set OUTPUT_FILE=./output/study_logs_!USERNAME!.txt

REM Specify the path to the download folder
set DOWNLOAD_FOLDER=%USERPROFILE%\Downloads

REM Create the output folder if it does not exist
if not exist "./output" (
    mkdir "./output"
)

REM Open the output file in append mode if it already exists
if exist "%OUTPUT_FILE%" (
    for %%i in ("%DOWNLOAD_FOLDER%\quiz_log*") do (
        type "%%i" >> "%OUTPUT_FILE%"
        echo.>>"%OUTPUT_FILE%"
        del "%%i"
    )
) else (
    REM Create a new output file if it does not exist
    type nul > "%OUTPUT_FILE%"
    for %%i in ("%DOWNLOAD_FOLDER%\quiz_log*") do (
        type "%%i" >> "%OUTPUT_FILE%"
        echo.>>"%OUTPUT_FILE%"
        del "%%i"
    )
)

echo File consolidation completed.

REM Create an infinite loop to prevent the prompt from closing.
:loop
timeout /t 3600 /nobreak >nul
goto loop
