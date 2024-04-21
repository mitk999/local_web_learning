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

REM 再帰的にフォルダを検索するサブルーチン
:searchFolders
for /r "%folder_path%" %%F in (*.json) do (
    REM JSONファイルから各 "word" の出現回数を取得
    set "json_file=%%F"
    set "folder_path=%%~dpF"
    for /f "tokens=2 delims=:,{}" %%W in ('type "!json_file!" ^| findstr /r /c:"\"word\":"') do (
        set "word=%%W"
        REM 両端のクォーテーションを削除
        set "word=!word:~1,-1!"
        REM 出現回数をカウント
        set /a "word_counts[!word!]+=1"
    )
)

REM 結果を "word_count.txt" として出力
set output_file="output\word_count.txt"
(
    echo フォルダ: %folder_path%
    echo 各 "word" の出現回数:
    for /f "tokens=2,* delims=[]=" %%I in ('set word_counts[') do (
        echo %%I: %%J
    )
) > %output_file%

echo 結果は %output_file% に保存されました。

endlocal

:loop
timeout /t 3600 /nobreak >nul
goto loop
