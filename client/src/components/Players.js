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
                return (player.scores + player.assists + 
                    player.Ds - player.drops)
            }
        },
        {
            name: "Efficiency %",
            data: (player) => {
                return ((player.pWon / player.pointsPlayed) * 100).toFixed(0)
            }
        },
        {
            name: "Passing %",
            data: (player) => {
                let pass = ((player.throws - player.throwaways) / player.throws).toFixed(2)
                if (isNaN(pass)) {
                    return "*"
                }
                return (pass * 100).toFixed(0)
            }
        },
        {
            name: "Points Played",
            data: (player) => {
                return player.pointsPlayed
            }
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
                return player.scores
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
                return player.catches
            }
        },
        {
            name: "Completions",
            data: (player) => {
                return player.completions
            }
        },
        {
            name: "Throwaways",
            data: (player) => {
                return player.throwaways
            }
        },
        {
            name: "Touches",
            data: (player) => {
                return player.drops + player.Ds + player.catches
            }
        },
        {
            name: "Drops",
            data: (player) => {
                return player.drops
            }
        },
        {
            name: "Passing %",
            data: (player) => {
                let pass = ((player.throws - player.throwaways) / player.throws).toFixed(2)
                if (isNaN(pass)) {
                    return "*"
                }
                return (pass * 100).toFixed(0)
            }
        },
        {
            name: "Catching %",
            data: (player) => {
                let cat = (player.catches / (player.catches + player.drops)).toFixed(2)
                if (isNaN(cat)) {
                    return "*"
                }
                return (cat * 100).toFixed(0)
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
                return player.pulls
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
                const {data} = await axios.get("http://localhost:4000/AllGames")
                setPlayerList(data[0])
            } catch(e) {
                console.log(e)
            }
        }
        fetchData();
    }, []) 

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
                    {playersInfo(playerList, tableState)}
                </div>
            </div>
        </div>
    )
}

export default Players;