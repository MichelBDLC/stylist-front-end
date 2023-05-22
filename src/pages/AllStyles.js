import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/AllStyles.css';

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

      //OR show all pieces and once clicked you can see what to style with?  
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
            <button name="all-styles" onClick={handleSelectedStyle}> All Pieces </button>
            <button name="other" onClick={handleSelectedStyle}> Other </button>
        </div>
        <br />
        <button className="add-new" onClick={() => navigate('/styles/new')} > + Add New Piece + </button>
        <br />
        <section className="pieces" >
            <br />
            {
                pieces.map((piece) => {

                    if (props.selectedStyle === "all-styles" || props.selectedStyle === piece.style) {

                        return (
                            <div className="piece" key={piece.id} onClick={() => navigate(`/styles/${piece.id}`)}>
                            <img src={piece.img} />
                            <span className="piece-text">
                            <p> {piece.name} </p>
                            <button onClick={() => handleDelete(piece.id)}> Delete </button>
                            </span>
                            </div>
                        )
                    }
                })
            }
        </section>
        </>
    )
}

//so now, lets make it look like a tumblr
//have the name appear when hovered over 
//and once clicked, go to its individual page

//first integrate the working add button 
//then re-style the allStyles page 


