import React, {useState, useEffect,useContext} from 'react';
import axios from 'axios';

import '../App.css';

export const playersInfo = (player_list, tableState) => {    // Gets all player info for current table state 
    var list

    // Headers for Summary stats
    let summHeaders_list = [
        {
            name: "Player Name",
            data: (player) => {
                return player.name
            }
        }, 
        {
            name: "Plus Minus",
            data: (player) => {
                return (player.goals + player.assists + 
                    player.Ds - player.drops)
            }
        },
        {
            name: "O Eff.",
            data: (player) => {return 0}
        },
        {
            name: "D Eff.",
            data: (player) => {return 0}
        },
        {
            name: "Pass %",
            data: (player) => {
                return Number((player.throws - (player.drops + player.throwaways)) / 
                    player.throws).toFixed(2)
            }
        },
        {
            name: "Points Played",
            data: (player) => {return 0}
        }
    ] 
    // Headers for Offence stats
    let oHeaders_list = [
        {
            name: "Player Name",
            data: (player) => {
                return player.name
            }
        },
        {
            name: "Goals",
            data: (player) => {
                return player.goals
            }
        },
        {
            name: "Assists",
            data: (player) => {
                return player.assists
            }
        },
        {
            name: "Catches",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Completions",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Throwaways",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Touches",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Drops",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Passing %",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Catching %",
            data: (player) => {
                return 0
            }
        }
    ]
    // Headers for Defence stats
    let dHeaders_list = [
        {
            name: "Player Name",
            data: (player) => {
                return player.name
            }
        },
        {
            name: "Ds",
            data: (player) => {
                return player.Ds
            }
        },
        {
            name: "Pulls",
            data: (player) => {
                return 0
            }
        },
        {
            name: "Pulls OB",
            data: (player) => {
                return player.pullsOB
            }
        }
    ]
    
    switch (tableState) {
        case 0:
            list = summHeaders_list
            break
        case 1:
            list = oHeaders_list
            break
        case 2:
            list = dHeaders_list
            break
    }

    return (
        <table className="player_table">
            <thead>
                <tr>
                    {list.map((header) => <th key={header}> {header.name} </th>)}
                </tr>
            </thead>
            <tbody>
                {player_list.map((player) => (
                    <tr>
                        {list.map((header) => <td>{header.data(player)}</td> )}
                    </tr>
                ))}
            </tbody>
        </table>       
    )
}
const Players = () => {
    const [tableState, setTableState] = useState(0)
    const [playerList, setPlayerList] = useState([])

    useEffect(() =>  {
        async function fetchData(){
            try {
                const data = await axios.get("https://localhost:4000")
                console.log(data)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData();
    }, [playerList]) 

    console.log(playerList)

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

    return (
        <div class='main'>
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
                </div>
            </div>
        </div>
    )
}

export default Players;