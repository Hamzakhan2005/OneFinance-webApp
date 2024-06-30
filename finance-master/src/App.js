import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import Signup from "./components/Signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oneFinance" element={<Home />} />
      <Route path="/accounts" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
