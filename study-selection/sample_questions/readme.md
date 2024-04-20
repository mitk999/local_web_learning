JSONのフォーマットは以下。
[  
   {  
      "word":"Apple", -> 問題文  
      "kana":"リンゴ", -> 問題分のカタカナ（使われていません）  
      "word_voice":true, -> 問題文読み上げ。trueにすると音声が流れます  
      "options":[ -> 回答のリスト。すべて出力されます。  
         "リンゴ",  
         "バナナ",  
         "オレンジ",  
         "イチゴ",  
         "メロン"  
      ],  
      "options_shuffle":true, -> 回答の順番を毎回変えたい場合はtrueに。  
      "answer":"リンゴ" -> 回答をoptionsのなかから一つ選んで書いてください。こことoptionsの文字が一致する場合に正解判定されます  
   },  