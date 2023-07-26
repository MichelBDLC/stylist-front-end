import { useNavigate } from "react-router-dom";
import '../css/NotFound.css';

export default function NotFound() {

    const navigate = useNavigate();

    return (
        <>
        <br />
        <button onClick={() => navigate('/')}> Go back to homepage </button>
        <br />
        <p> Page Not Found. </p>
        </>
    )
}