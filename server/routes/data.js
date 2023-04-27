const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const playerJSONbase = '{"name":"", "drops":0, "catches":0, "completions":0, "throws":0, "throwaways":0, "pulls":0, "pullsOB":0, "scores":0, "assists":0, "Ds":0 }';
  const gameJSONbase = '{"game":"", "opponent":"", "ScoreHome":0, "ScoreAway":0 }'

  var playerJSONS = []
  var gameJSONS = []
  var filepath = "StevensAll-stats.csv";
  var filetext = ""
  const fs = require('fs')
  
  filetext = fs.readFileSync(filepath, 'utf-8') 
  CreateList();
  
  function CreateList() {
      var allTextLines = filetext.split(/\r\n|\n/);
  
      for (var i=1; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(',');
          
          if (data[8] == "Goal") {
              var name1 = data[10]
              var name2 = data[9]
  
              if (data[11] != "Anonymous") { 
                  var player1 = playerJSONS.find((arg) => {return (arg.name == name1)})
                  if (player1 == undefined) {player1 = JSON.parse(playerJSONbase); player1.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player1)}}
  
                  var player2 = playerJSONS.find((arg) => {return (arg.name == name2)})
                  if (player2 == undefined) {player2 = JSON.parse(playerJSONbase); player2.name = name2; if(name2 != "" && name2 != "Anonymous") {playerJSONS.push(player2)}}
  
                  player1.scores++
                  player1.catches++
  
                  player2.assists++
                  player2.throws++ 
  
                  var currGame = gameJSONS.find((arg) => {return (arg.game == data[0])})
                  if(currGame == undefined) {currGame = JSON.parse(gameJSONbase); currGame.game = data[0]; currGame.opponent = data[2]; gameJSONS.push(currGame)}
                      currGame.ScoreHome++; 
                  } 
                  else {
                  var currGame = gameJSONS.find((arg) => {return (arg.game == data[0])})
                  if(currGame == undefined) {currGame = JSON.parse(gameJSONbase); currGame.game = data[0]; currGame.opponent = data[2]; gameJSONS.push(currGame)}
                      currGame.ScoreAway++; 
                  }    
              
          }
          else if (data[8] == "Pull") {
              var name1 = data[11]
              var player = playerJSONS.find((arg) => {return (arg.name == name1)})
              if (player == undefined) {player = JSON.parse(playerJSONbase); player.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player)}}
              player.pulls++;
          }    
          else if (data[8] == "PullOb") {
              var name1 = data[11]
              var player = playerJSONS.find((arg) => {return (arg.name == name1)})
              if (player == undefined) {player = JSON.parse(playerJSONbase); player.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player)}}
              player.pulls++ 
              player.pullsOB++
          }
          else if (data[8] == "D"){
              var name1 = data[11]
              var player = playerJSONS.find((arg) => {return (arg.name == name1)})
              if (player == undefined) {player = JSON.parse(playerJSONbase); player.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player)}}
              player.Ds++
          }
          else if (data[8] ==  "Catch") {
                  var name1 = data[10]
                  var name2 = data[9]
  
                  var player1 = playerJSONS.find((arg) => {return (arg.name == name1)})
                  if (player1 == undefined) {player1 = JSON.parse(playerJSONbase); player1.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player1)}}
  
                  var player2 = playerJSONS.find((arg) => {return (arg.name == name2)})
                  if (player2 == undefined) {player2 = JSON.parse(playerJSONbase); player2.name = name2; if(name2 != "" && name2 != "Anonymous") {playerJSONS.push(player2)}}
  
                  player1.catches++ 
                  player2.completions++
                  player2.throws++ 
          }
          else if (data[8] ==  "Throwaway") {
              if (data[11] != "Anonymous") { 
              var name1 = data[9]
              var player = playerJSONS.find((arg) => {return (arg.name == name1)})
              if (player == undefined) {player = JSON.parse(playerJSONbase); player.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player);}}
              player.throwaways++
              player.throws++
              }
          }
          else if (data[8] ==   "Drop"){
              var name1 = data[10]
              var name2 = data[9]
  
              if (name2 != "Anonymous") {
              
              var player1 = playerJSONS.find((arg) => {return (arg.name == name1)})
              if (player1 == undefined) {player1 = JSON.parse(playerJSONbase); player1.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player1);}}
              
              var player2 = playerJSONS.find((arg) => {return (arg.name == name2)})
              if (player2 == undefined) {player2 = JSON.parse(playerJSONbase); player2.name = name2; if(name2 != "" && name2 != "Anonymous") {playerJSONS.push(player2);}}
  
              player1.drops++
              player2.throws++
              
              }
          }
          else {break;}
      }
  }
  res.json([playerJSONS, gameJSONS]);
});

module.exports = router;
