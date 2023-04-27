import {NavLink} from 'react-router-dom';

const logo = 'https://see.fontimg.com/api/renderfont4/X3WjK/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTI1MCwiZnMiOjUyLCJmZ2MiOiIjRkZGRUZFIiwiYmdjIjoiI0RCMzAzMCIsInQiOjF9/R3JvdXAgTnVsbA/uncracked-free-trial.png'


const Navigation = () => {
    return (
        <nav className='navigation'>
            <NavLink className='navLink' to='/players'>
                Players
            </NavLink>
            <NavLink className='navLink' to='/team'>
                Team
            </NavLink>
            <NavLink className='navLink' to='/games'>
                Games
            </NavLink>
        </nav>
    )

}

export default Navigation;