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
                const data = await axios.get("https://localhost:4000")
        }
        fetchData();
    }, [playerList, gameList]) 

    // Lists of players to be replaced by JSON
    let player_list = [
        {
            name: "scoob",
            goals: 123,
            assists: 3,
            Ds: 20,
            drops: 3,
            pullsOB: 2,
            throws: 100,
            throwaways: 1
        },
        {
            name: "dylan",
            goals: 234,
            assists: 5,
            Ds: 900,
            drops: 3,
            pullsOB: 1,
            throws: 200,
            throwaways: 1
        },
        {
            name: "charles",
            goals: 345,
            assists: 3,
            Ds: 10,
            drops: 3,
            pullsOB: 2,
            throws: 150,
            throwaways: 1
        },
        {
            name: "alex",
            goals: 12,
            assists: 1,
            Ds: 10,
            drops: 3,
            pullsOB: -1,
            throws: 20,
            throwaways: 1
        }
    ]

    let game_list = ['Stevens v Dickenson',
                     'Stevens v Salisbury',
                     'Stevens v RUIT',
                     'Stevens v Stockton']


    const build_game_list = (game, index) =>{
        return(
            <li class={ gameState == index ? 'selected_game' : 'game_button'} onClick={() => {
                setGameState(index); 
                setTableState(0);
            }}>
                <a>
                    {game}
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
                        {game_list.map((game, index) => build_game_list(game, index))}
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
                        {playersInfo(player_list, tableState)}
                        {tableState} {gameState}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games;