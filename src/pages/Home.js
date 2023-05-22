import { useState, useEffect } from "react";
import axios from "axios";
import '../css/Home.css';
import { Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Home(props) {

  const [imgArr, setImgArr] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(`${API}/styles`)
    .then((response) => {
        const images = response.data.map((item) => item.img);
        setImgArr(images);
    }) 
    .catch(e => console.error('catch', e));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {

        setIndex((prevIndex) => (prevIndex + 1) % imgArr.length);
    }, 3000);

    return () => {
        clearInterval(interval);
    };
  }, [imgArr]);

  function handleSelectedStyle(event) {

    props.setSelectedStyle(event.target.name);
    navigate('/styles');
  }

    return (
        <div className="home">
        <section className="nav" >
            <div className="nav-texts">
            <br />
            <h2> What kind of styles would you like to see? </h2>
            <br />
            <span className="style-types">
            <Link to='/styles' name='cocktail' onClick={handleSelectedStyle}> Cocktail </Link>
            <Link to='/styles' name='minimalist' onClick={handleSelectedStyle}> Minimalist </Link>
            <Link to='/styles' name='nightlife' onClick={handleSelectedStyle}> Nightlife </Link>
            <Link to='/styles' name='casual-stunt' onClick={handleSelectedStyle}> Casual Stunt </Link>
            </span>
            </div>
            <br />
            <div className="center-styling-btn">
            <button className="styling-btn" name="all-styles" onClick={handleSelectedStyle}> See all pieces </button>
            </div>
        </section>
        <div className="slide" >
            {
                imgArr.length > 0 && (
                    <img src={imgArr[index]} style={{ width: "100%" }} />
                )
            }
        </div>
        <br />
        </div>
    );
}
