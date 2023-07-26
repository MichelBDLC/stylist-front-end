import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/AllStyles.css';
import ThePiece from "../components/ThePiece";

const API = process.env.REACT_APP_API_URL;

export default function AllStyles(props) {

    const [pieces, setPieces] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('all-styles');

    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`${API}/styles`)
        .then((response) => {
            setPieces(response.data);
            for (let item of response.data) {
                setCategory(item.category)
            }
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

      function handleSort(event) {
        if (event.target.name === category) {
            setSelectedCategory(event.target.name);
        }
        return;
      }

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
        <select onChange={handleSort}>
            <option name="sort"> Sort </option>
            <option name="Tops"> Tops </option>
            <option name="Bottoms"> Bottoms </option>
            <option name="Dresses"> Dresses </option>
            <option name="Accesories"> Accesories </option>
            <option name="Other"> Other </option>
        </select>
        <button className="add-new" onClick={() => navigate('/styles/new')} > + Add New Piece + </button>
        <br />
        <ThePiece pieces={pieces} selectedCategory={selectedCategory} selectedStyle={props.selectedStyle} handleDelete={handleDelete} />
        </>
    )
}

 


