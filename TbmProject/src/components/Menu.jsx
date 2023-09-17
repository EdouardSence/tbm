import SearchBarBus from "./SearchBarBus";
import { Link } from "react-router-dom";

function Menu() {
    return (
        <>
        <SearchBarBus />
        <div className="menu">
            <Link to="/tbm/favori/">Favori</Link>
        </div>
        </>
    );
    }

export default Menu;