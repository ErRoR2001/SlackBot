require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const fs = require('fs');
const channel = "#general";
var menu_el;
const app = express();
const port = 3000;
app.listen(process.env.port || port, function() {
   console.log('Bot is listening on port ' + port);
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.post('/hpme', function(req, res){
   var help_file = fs.readFileSync(__dirname + "/help.txt");
   var data = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: channel,
      text: help_file
   }};
   post_req(data, req, res);
});
app.post('/menu', function(req, res){
   var menu_file = fs.readFile(__dirname + "/menu.txt", "utf8", function(err, data){
      menu_el = data.split(';');
      message = {
         response_type: 'in_channel',
         blocks: [   
         {
            "type": "section",
            "text": {
               "type": "mrkdwn",
               "text": "*Menu*"
            }
         }
      ]};
      for(i = 0; i < menu_el.length-1; i++){
         var property = menu_el[i].split('.');
         message.blocks.push({
            "type": "section",
            "text": {
               "type": "mrkdwn",
               "text": "*" +property[0] + "*\nStructure:" + property[1]
            }
         });
         message.blocks.push({"type": "divider"});
      }
      res.json(message);
   });
});
app.post('/order', function(req, res){
   const order = req.body.text;
   const order_p = order.split(',');
   if(order_p.length < 3){
      error_notify('Wrong parametrs count', req, res);
   }else if(isNaN(order_p[1])){
      error_notify("Pizza's size must be a num", req, res);
   }else{
      var read_order_file = fs.readFile(__dirname + '/orders.txt', 'utf8' , function(err, data){
         var write_order_file = fs.writeFile(__dirname + '/orders.txt', data + order + ';', function(){console.log('Added new order');});
      });
      var data = {form: {
         token: process.env.SLACK_AUTH_TOKEN,
         channel: channel,
         text: "it's ur order:\n" + order + "\nOur operator will call u\nThank for choise us!" 
      }};
      post_req(data, req, res);
   }
});

function error_notify(error, req, res){
   var data = {form: {
      token: process.env.SLACK_AUTH_TOKEN,
      channel: channel,
      text: error
   }};
   post_req(data, req, res);
};
function post_req(data, req, res){
   request.post('https://slack.com/api/chat.postMessage', data, function (error, response, body) {
      res.json();
   });
};