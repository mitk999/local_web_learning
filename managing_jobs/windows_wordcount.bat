@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM フォルダのパスをユーザーに入力させる
set /p folder_path="フォルダのパスを入力してください: "

REM フォルダが存在するかチェック
if not exist "%folder_path%" (
    echo フォルダが見つかりません。
    exit /b
)

REM 出力先フォルダを作成
if not exist "output" mkdir "output"

REM 各 "word" の出現回数を格納する連想配列を初期化
set "word_counts="

REM フォルダ内のJSONファイルを走査
for %%f in ("%folder_path%\*.json") do (
    REM JSONファイルから各 "word" の出現回数を取得
    set "json_file=%%f"
    for /f "tokens=2 delims=:,{}" %%w in ('type "!json_file!" ^| findstr /r /c:"\"word\":"') do (
        set "word=%%w"
        REM 両端のクォーテーションを削除
        set "word=!word:~1,-1!"
        REM 出現回数をカウント
        set /a "word_counts[!word!]+=1"
    )
)

REM 結果を "word_count.txt" として出力
set output_file="output\word_count.txt"
(
    echo 各 "word" の出現回数:
    for /f "tokens=2,* delims=[]=" %%i in ('set word_counts[') do (
        echo %%i: %%j
    )
) > %output_file%

echo 結果は %output_file% に保存されました。

endlocal

:loop
timeout /t 3600 /nobreak >nul
goto loop