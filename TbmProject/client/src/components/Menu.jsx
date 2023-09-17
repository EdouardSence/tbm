import SearchBarBus from "./SearchBarBus";
import { Link } from "react-router-dom";

function Menu() {
    return (
        <>
        <SearchBarBus viewbus= { true } />
        <Link to="/tbm/favori/">Favori</Link>
        </>
    );
    }

export default Menu;