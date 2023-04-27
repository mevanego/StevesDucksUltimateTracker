import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';
import {playersInfo} from './Players'


const Games = () =>{
    const [tableState, setTableState] = useState(0)
    const [gameState, setGameState] = useState(0)
    const [playerList, setPlayerList] = useState([])
    const [gameList, setGameList] = useState([])

    useEffect(() =>  {
        async function fetchData(){
            try {
                const {data} = await axios.get("http://localhost:4000")
                setPlayerList(data[0])
                setGameList(data[1])
            } catch(e) {
                console.log(e)
            }
        }
        fetchData();
    }, []) 

    const build_game_list = (game, index) =>{
        return(
            <li class={ gameState == index ? 'selected_game' : 'game_button'} onClick={() => {
                setGameState(index); 
                setTableState(0);
            }}>
                <a>
                    Stevens v {game.opponent} ({game.ScoreHome} - {game.ScoreAway})
                </a>
            </li>
        );
    }

    return (
        <div class='main'>
            <div class='left_side'>
                <div class='games_header'>
                    <h4>
                        Games
                    </h4>
                </div>
                <div class='div_games'>
                    <ul class='games'>
                        {gameList.map((game, index) => build_game_list(game, index))}
                    </ul>
                </div>
            </div>
            <div class='right_side'>
                <div class="header">
                    <h3>
                        Player Statistics
                    </h3>
                </div>
                <div class="content">
                    <div class="div_table_buttons">
                        <ul class="table_buttons">
                            <li>
                                <button onClick={() => setTableState(0)}>
                                    Summary
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTableState(1)}>
                                    Offense
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setTableState(2)}>
                                    Defense
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {playersInfo(playerList, tableState)}
                        {tableState} {gameState}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games;