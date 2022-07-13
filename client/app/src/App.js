import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import Login from "./Components/Login/Login";
import Deposit from "./Components/Deposit/Deposit";
import Withdraw from "./Components/Withdraw/Withdraw";
import CreateMatch from "./Components/CoinGame/CreateMatch";
import Balance from "./Components/Balance/Balance";
import DisplayMatch from "./Components/DisplayMatches/DisplayMatch";

function App() {
  return (
    <div className="App">
      <Login />
      <Deposit />

      <CreateMatch />
      <DisplayMatch />
    </div>
  );
}

export default App;
