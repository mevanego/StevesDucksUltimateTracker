import { Link } from 'react-router-dom';


const Team = () =>{


    let players = [
        {
            name: 'Scoob',
            image: 'https://media.4-paws.org/a/f/4/7/af47ae6aa55812faa4d7fd857a6e283a8c8226bc/VIER%20PFOTEN_2019-07-18_013-2890x2000-1920x1329.jpg',
            position: 'Flex'
        },
        {
            name: 'Dylan',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGuuisEGcZ9M_eS9p9dGbO9MEyoBIvjIs56Q&usqp=CAU',
            position: 'Handler'
        },
        {
            name: 'Charles',
            image: 'https://poultry.mystagingwebsite.com/wp-content/uploads/2019/02/shutterstock_1260339205-1024x683.jpg',
            position: 'Handler'
        },
        {
            name: 'Frosty',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCvurfhpi_Pko07p0T0I84Rbrd7dOnxYOWw&usqp=CAU',
            position: 'Cutter'
        }
    ]

    const build_player_card = (player) => {
        return (
            <li>
                <Link to={`/player/${player.name}`}>
                    <img className="profile_image" src={player.image} alt='Player'/>
                    <div>
                        <h2>{player.name}</h2>
                        <p>{player.position}</p>
                    </div>
                </Link>
            </li>
        )
    }

    return (
        <div>
            <div className="team_container">
                <h1>
                    Players
                </h1>
                <ul className="player_list">
                    {players.map(player => build_player_card(player))}
                </ul>
            </div>
        </div>
    )
}

export default Team;