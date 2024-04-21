JSONのフォーマットは以下。
[  
   {  
      "word":"Apple", -> 問題文  
      "word_hidden":false, -> 出題時に文字を隠したい場合にtrueを入れてください。例えばword_hidden:trueでword_voice:trueにすると、聞き取り問題が作成できます。
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
      "answer":"リンゴ" -> 回答をoptionsのなかから一つ選んで書いてください。こことoptionsの文字が一致する場合に正解判定されます。  
, "answer_description":"リンゴはApple（アップル）です。" -> 回答の解説を入れます
   },  
