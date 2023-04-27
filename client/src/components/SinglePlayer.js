import {useParams } from "react-router-dom";

const SinglePlayer = () =>{

    const params = useParams();

    return (
        <div>
            This is the page for {params.name}
        </div>
    )
}

export default SinglePlayer;