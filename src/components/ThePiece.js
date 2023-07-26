import { useNavigate } from "react-router-dom";
import '../css/AllStyles.css';

export default function ThePiece(props) {

    const navigate = useNavigate();

    return (
    <section className="pieces" >
        {
            props.pieces.map((piece) => {

                if (props.selectedCategory !== "sort")

                if (props.selectedStyle === "all-styles" || props.selectedStyle === piece.style) {

                    return (
                        <div className="piece" key={piece.id} onClick={() => navigate(`/styles/${piece.id}`)}>
                        <img src={piece.img} alt="" />
                        <span className="piece-text">
                        <p> {piece.name} </p>
                        <button onClick={() => props.handleDelete(piece.id)}> Delete </button>
                        </span>
                        </div>
                    )
                }
                return null;
            })
        }
    </section>
    )
}