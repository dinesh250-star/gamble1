import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const CreateMatch = () => {
  const [coin, setCoin] = useState("Heads");
  const [bet, setBet] = useState(1);
  const acc = useSelector((state) => state.db.userAcc);
  const logInState = useSelector((state) => state.db.loggedIn);
  if (logInState) {
    document.getElementById("buttonCreate").disabled = false;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    let res;
    await axios
      .post("http://localhost:3001/withdraw", {
        acc: acc,
        value: bet,
      })
      .then((response) => {
        console.log(response.data);
        res = response.data;
      });

    if (res == true) {
      await axios.get(`http://localhost:3001/games/${acc}`).then((response) => {
        if (response.data == true) {
          axios
            .post("http://localhost:3001/createGame", {
              acc: acc,
              coin: coin,
              value: bet,
            })
            .then((res) => {
              alert("Game created");
            });
        } else {
          alert("Already game created");
        }
      });
    } else {
      alert("Not enough funds");
    }
  };
  const coinValue = (e) => {
    setCoin(e.target.value);
  };
  const amount = (e) => {
    setBet(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <select name="Coin" required onChange={coinValue}>
          <option value="Heads">Heads</option>
          <option value="Tails">Tails</option>
        </select>
        <input
          type="number"
          placeholder="Enter your bet"
          required
          value={bet}
          onChange={amount}
        ></input>
        <button type="submit" id="buttonCreate" disabled>
          Create a Game
        </button>
      </form>
    </div>
  );
};
export default CreateMatch;
