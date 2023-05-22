import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../css/Piece.css';

const API = process.env.REACT_APP_API_URL;

export default function Piece() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [piece, setPiece] = useState({});

    useEffect(() => {
        axios
        .get(`${API}/styles/${id}`)
        .then(response => {
            setPiece(response.data)
        })
        .catch((e) => {
            console.error(e);
        });
    }, [id]);

    return (
        <>
        <br />
        <button className="goBack-btn" onClick={() => navigate('/styles')}> Go back to all styles </button>
        <br />
        <button className="edit-btn" onClick={() => navigate(`/styles/${piece.id}/edit`)} > Edit </button>
        <br />
        <div className="piece-details">
        <img src={piece.img} alt=""/>
        <div className="piece-text">
        <h4> {piece.name} </h4>
        <br />
        <button className="web-link"><Link to={piece.url}> view in original website </Link></button>
        </div>
        </div>
        <section>
            {/* other pair style suggestions here  */}
        </section>
        </>
    )
}
//show style it with pieces on the bottom... figure it out!!
//link to website where to buy called (lets go buy it)
//if style says casual-stunt, make style show as Casual Stunt 

//add to favs or add to my style closet as favs

//then incorporate add, delete, edit, update, stuff w.e
//then do some more editing to complete the look at the end, add a bunch of unnecesary shit 