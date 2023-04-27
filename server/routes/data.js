const express = require('express');
const filter = require('jade/lib/filters');
const router = express.Router();

/* GET users listing. */
router.get('/:game', async (req, res) => {

    
  if(req.params.game == "AllGames") {
    gameFilter = "";
  }
  else {
    gameFilter = req.params.game;
  }

  const playerJSONbase = '{"name":"", "drops":0, "catches":0, "completions":0, "throws":0, "throwaways":0, "pulls":0, "pullsOB":0, "scores":0, "assists":0, "Ds":0, "pointsPlayed":0, "pWon":0, "pLost":0 }';
  const gameJSONbase = '{"game":"", "opponent":"", "ScoreHome":0, "ScoreAway":0 }'

  var playerJSONS = []
  var gameJSONS = []
  var filepath = "StevensAll-stats.csv";
  var filetext = ""
  const fs = require('fs')
  
  filetext = fs.readFileSync(filepath, 'utf-8') 
  CreateList();
  
  function findPlayer(name1) {
    var player = playerJSONS.find((arg) => {return (arg.name == name1)})
    if (player == undefined) {player = JSON.parse(playerJSONbase); player.name = name1; if(name1 != "" && name1 != "Anonymous") {playerJSONS.push(player)}}
    return player
  }

  function CreateList(filter = "") {
      var allTextLines = filetext.split(/\r\n|\n/);
  
      for (var i=1; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(',');
          if(gameFilter != "" && gameFilter != data[0]) {continue;}
          if (data[8] == "Goal") {
              var name1 = data[10]
              var name2 = data[9]
  
              if (data[11] != "Anonymous") { 
                var player1 = findPlayer(name1);
                var player2 = findPlayer(name2);
                  
                player1.scores++
                player1.catches++
  
                player2.assists++
                player2.throws++ 
  
                var currGame = gameJSONS.find((arg) => {return (arg.game == data[0])})
                if(currGame == undefined) {currGame = JSON.parse(gameJSONbase); currGame.game = data[0]; currGame.opponent = data[2]; gameJSONS.push(currGame)}
                    currGame.ScoreHome++; 

                    var tempName = data[13]; var tempPlayer;
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[14];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[15];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[16];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[17];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[18];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                    tempName = data[19];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pWon++}
                } 
                else {
                    var currGame = gameJSONS.find((arg) => {return (arg.game == data[0])})
                    if(currGame == undefined) {currGame = JSON.parse(gameJSONbase); currGame.game = data[0]; currGame.opponent = data[2]; gameJSONS.push(currGame)}
                    currGame.ScoreAway++; 

                    var tempName = data[13]; var tempPlayer;
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[14];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[15];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[16];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[17];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[18];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                    tempName = data[19];
                    if (tempName != "") { tempPlayer = findPlayer(tempName); tempPlayer.pointsPlayed++;tempPlayer.pLost++}
                }    
                
                

          }
          else if (data[8] == "Pull") {
              var name1 = data[11]
              var player = findPlayer(name1);
              player.pulls++;
          }    
          else if (data[8] == "PullOb") {
              var name1 = data[11]
              var player = findPlayer(name1);
              player.pulls++ 
              player.pullsOB++
          }
          else if (data[8] == "D"){
              var name1 = data[11]
              var player = findPlayer(name1);
              player.Ds++
          }
          else if (data[8] ==  "Catch") {
                  var name1 = data[10]
                  var name2 = data[9]
  
                  var player1 = findPlayer(name1);
  
                  var player2 = findPlayer(name2);
  
                  player1.catches++ 
                  player2.completions++
                  player2.throws++ 
          }
          else if (data[8] ==  "Throwaway") {
              if (data[11] != "Anonymous") { 
              var name1 = data[9]
              var player = findPlayer(name1);
              player.throwaways++
              player.throws++
              }
          }
          else if (data[8] ==   "Drop"){
              var name1 = data[10]
              var name2 = data[9]
  
              if (name2 != "Anonymous") {
              
              var player1 = findPlayer(name1);
              
              var player2 = findPlayer(name2);
  
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
