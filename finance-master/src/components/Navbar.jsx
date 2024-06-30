import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <div className="heading">
            <a href="">
              <h1>OneFinance</h1>
            </a>
          </div>
        </li>
        <div className="links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/accounts">Accounts</Link>
          </li>

          <li>
            <Link to="/budget">Budget</Link>
          </li>

          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
