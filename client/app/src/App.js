import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Login from "./Components/Login/Login";
import Deposit from "./Components/Deposit/Deposit";
import Navbar from "./Components/Navbar/Navbar";
import Withdraw from "./Components/Withdraw/Withdraw";
import Create from "./Components/Create/Create";
import Main from "./Components/Main/Main";
import Lobby from "./Components/Lobby/Lobby";
import Play from "./Components/Play/Play";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Create />
    </div>
  );
}

export default App;
