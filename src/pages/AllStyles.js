import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/AllStyles.css';
import ThePiece from "../components/ThePiece";

const API = process.env.REACT_APP_API_URL;

export default function AllStyles(props) {

    const [pieces, setPieces] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`${API}/styles`)
        .then((response) => {
            setPieces(response.data);
        }) 
        .catch(e => console.error('catch', e));
      }, []);

      function handleSelectedStyle(event) {
        props.setSelectedStyle(event.target.name);
      }

      function handleDelete(pieceId) {
        axios
        .delete(`${API}/styles/${pieceId}`)
        .then(() => {
            setPieces((prevPieces) => prevPieces.filter((thePiece) => thePiece.id !== pieceId));
            navigate('/styles')
        })
        .catch((error) => {
            console.error(error);
        });
      }

      //7 per style preferably, but start with like 2 and if you have time add more  

    return (
        <>
        <br />
        <div className="styles-nav">
            <br />
            <button name="cocktail" onClick={handleSelectedStyle}> Cocktail </button>
            <button name="minimalist" onClick={handleSelectedStyle}> Minimalist </button>
            <button name="nightlife" onClick={handleSelectedStyle}> Nightlife </button>
            <button name="casual-stunt" onClick={handleSelectedStyle}> Casual Stunt </button>
            <button name="girly" onClick={handleSelectedStyle}> Girly </button>
            <button name="all-styles" onClick={handleSelectedStyle}> All Pieces </button>
            <button name="other" onClick={handleSelectedStyle}> Other </button>
        </div>
        <br />
        <button className="add-new" onClick={() => navigate('/styles/new')} > + Add New Piece + </button>
        <br />
        <ThePiece pieces={pieces} selectedStyle={props.selectedStyle} handleDelete={handleDelete} />
        </>
    )
}

 


