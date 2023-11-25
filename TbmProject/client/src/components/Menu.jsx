// import SearchBarBus from ".vraiTBHess/SearchBarBus";
import RechercheBus from "./voirBus/rechercheBus";
import '../assets/Css/App.css'
import { Link } from "react-router-dom";

function Menu() {
    return (
        <>
        <RechercheBus/>
        <Link to="/tbm/profiles/">Liste des profiles</Link>
        {/* <Link to="/tbm/favori/">Favori</Link> */}
        </>
    );
    }

export default Menu;