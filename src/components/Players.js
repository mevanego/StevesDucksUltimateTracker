import React, {useState, useEffect,useContext} from 'react';


//import '../App.css';


const Players = () =>{
    const [tableState, setTableState] = useState(0)

    //have a goon do the table changing
    let table = <table>
        {tableState}
    </table>


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
                    {table}
                </div>
            </div>
        </div>
    )
}

export default Players;