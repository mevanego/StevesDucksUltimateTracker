import {useParams } from "react-router-dom";

const SinglePlayer = () =>{

    const params = useParams();

    return (
        <div>
            {params.name}
        </div>
    )
}

export default SinglePlayer;