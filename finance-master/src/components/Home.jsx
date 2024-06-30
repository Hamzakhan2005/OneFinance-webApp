import "./Home.css";
import WordChanger from "./WordChanger";
import { FaAngleDoubleDown } from "react-icons/fa";
import Navbar from "./Navbar.jsx";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="title">
          <h1>1-site for managing your money</h1>
        </div>
        <div className="line">
          <h3>
            Manage your money like you <WordChanger />
          </h3>
        </div>
        <h6>Click to check your accounts.</h6>
        <div className="scroll bounce">
          <a href="#cards">
            <FaAngleDoubleDown />
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
