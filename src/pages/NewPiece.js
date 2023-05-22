import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/NewPiece.css';

const API = process.env.REACT_APP_API_URL;

export default function NewPiece() {

    const navigate = useNavigate();

    const addPiece = newPiece => {

        axios
        .post(`${API}/styles`, newPiece)
        .then(
            () => {
                navigate(`/styles`);
            },
            error => console.error(error)
        )
        .catch(c => console.warn('catch', c));
    };

    const [piece, setPiece] = useState({
        name: '',
        category: '',
        style: '',
        price: '',
        is_favorite: false,
        url: '',
        img: '',
    });

    const handleTextChange = event => {
        setPiece({ ...piece, [event.target.id]: event.target.value });
    };

    const handleCheckboxChange = event => {
        setPiece({...piece, [event.target.id]: event.target.checked });
    }

    const handleSubmit = event => {
        event.preventDefault();
        addPiece(piece);
    };

    return (
        <>
        <br />
        <button className="goBack-btn" onClick={() => navigate('/styles')}> Go back to all styles </button>
        <br />
        <div className="New">
            <br />
            <div className="form">
                <br />
            <form onSubmit={handleSubmit}>
                <br />
                <div className="fav">
                    <br />
                <label> Favorite? </label>
                <input id="is_favorite" type="checkbox" onChange={handleCheckboxChange} checked={piece.is_favorite} />
                <br />
                </div>
                    <br />
                    <div>
                    <label> Name </label>
                    <input id="name" value={piece.name} type="text" onChange={handleTextChange} />
                    </div>
                    <br />
                    <div>
                    <label> Photograph URL </label>
                    <input id="photograph" type="text" value={piece.img} onChange={handleTextChange} />
                    </div>
                    <div>
                        <label> Price </label>
                        <input id="price" type="number" value={piece.price} onChange={handleTextChange} />
                    </div>
                <br />
                <div className="dropdowns">
                    <label> Category </label>
                    <select id="category" value={piece.category} onChange={handleTextChange}>
                        <option value="Other"> Other </option>
                        <option value="Tops"> Tops </option>
                        <option value="Bottoms"> Bottoms </option>
                        <option value="Dresses"> Dresses </option>
                        <option value="Outerwear"> Outerwear </option>
                        <option value="Accesories"> Accesories </option>
                    </select>
                    <br />
                    <label> Style </label>
                    <select id="style" value={piece.style} onChange={handleTextChange}>
                        <option value="Other"> Other </option>
                        <option value="Minimalist"> Minimalist </option>
                        <option value="Casual Stunt"> Casual Stunt </option>
                        <option value="Cocktail"> Cocktail </option>
                        <option value="Nightlife"> Nightlife </option>
                    </select>
                </div>
                <br />
                <button type="submit"> Add Piece </button>
            </form>
            </div>
        </div>
        </>
    )
}