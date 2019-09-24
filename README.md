# SlackBot
URL for connect to cannel:
https://join.slack.com/t/royruslanpizzabot/shared_invite/enQtNzU5MzAyOTE4NTkzLThkYzkwNmIwMTU0NmI1ZDQyZmI3NDc4OTQ5NDliYmY3MWM3ZWE4ZTAyZTY0MmU1Njc2ZjBhZTVhMjAwMzQ2ZGQ
Select general channel. 
Before this test i have not worked with node.js, therefore i chose @slack/client for node.
It is simple lib)
Also i use fs, express,body-parser.
I thought slash-commands is the best method for this task.(Just bind url in slack. Server waiting for necessary urls and 
communicate with slack api).
I created: index.js - core of this project(This file processes posted url),
  order.txt - Keep orders, menu.txt - Keep Pizza-menu with short description, 
  help.txt - Keep bot-commands with description & examples.
U can use following commands: /hpme - help, /menu - show Pizza-menu, /order - make order.
Bot can save ur order in order.txt .
