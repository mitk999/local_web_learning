# This folder contains jobs for administrators.
## windows_cat_logs.bat
After each study-xxx is completed, the log will be downloaded. This job cat the downloaded log and create text under managing_jobs/output and delete it from the download folder.
This file is for input of "score_dashboard". you can analyze study logs.
Only you have to do is to double click this file after study and open from score_dashboard.

## windows_wordcount.bat
Extract the value of the "word" key from the question text (json) in each folder and count the number of times. 
This is useful for investigating what kind of questions are being asked and whether there are any duplicates. It is also useful to input the listed results into a tool such as chatgpt and have them create questions that do not include the problem.
