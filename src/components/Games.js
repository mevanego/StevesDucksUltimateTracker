import React, {useState, useEffect,useContext} from 'react';



const Games = () =>{
    const [tableState, setTableState] = useState(0)
    const [gameState, setGameState] = useState(0)



    const games = (gamedate) => {
        //call data function for gameState Game
        


        return (
            <table>
                <thead>
                    
                </thead>
                <tbody>

                </tbody>
            </table>
        )
    }
    //have a goon do the table changing
    let table = <table>
        {tableState} {gameState}
    </table>

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
                        {table}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Games;