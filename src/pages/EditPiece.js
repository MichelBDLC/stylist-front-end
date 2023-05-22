import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function EditPiece() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [piece, setPiece] = useState({
        name: '',
        category: '',
        style: '',
        price: '',
        is_favorite: false,
        url: '',
        img: '',
    });

    const updatePiece = updatedPiece => {
        axios
        .put(`${API}/styles/${id}`, updatedPiece )
        .then(
            () => {
                navigate(`/styles/${id}`);
            },
            error => console.error(error)
        )
        .catch(c => console.warn('catch', c))
    };

    const handleTextChange = event => {
        setPiece({ ...piece, [event.target.id]: event.target.value });
    };

    const handleCheckbox = event => {
        setPiece({ ...piece, [event.target.id]: event.target.checked });
    };

    useEffect(() => {
        axios
        .get(`${API}/styles/${id}`)
        .then(response => setPiece(response.data));
    }, [id, navigate]);

    const handleSubmit = event => {
        event.preventDefault();
        updatePiece(piece, id);
    };

    return (
        <>
        <br />
        <button className="goBack-btn" onClick={() => navigate(-1)}> Go back </button>
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
                <input id="is_favorite" type="checkbox" onChange={handleCheckbox} checked={piece.is_favorite} />
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
                <br />
                <div>
                    <label> Price </label>
                    <input id="price" type="number" value={piece.price} onChange={handleTextChange} />
                </div>
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
                <button type="submit"> Save Edit </button>
            </form>
            </div>
        </div>
        </>
    )
}