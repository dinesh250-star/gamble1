import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { dbActions } from "../../store/dbSlice";
const CreateMatch = () => {
  const [coin, setCoin] = useState("Heads");
  const [bet, setBet] = useState(1);
  const dispatch = useDispatch();
  const [game, setGame] = useState(false);
  const acc = useSelector((state) => state.db.userAcc);
  const [creator, setCreator] = useState("-");
  const [creatorBet, setCreatorBet] = useState("-");
  const [amounts, setAmounts] = useState(0);
  const [del, setDel] = useState(0);
  const [noDisplay, setNoDisplay] = useState(false);
  const logInState = useSelector((state) => state.db.loggedIn);
  if (logInState) {
    document.getElementById("buttonCreate").disabled = false;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    let resp;
    await axios
      .post("http://localhost:3001/withdraw", {
        acc: acc,
        value: bet,
      })
      .then((response) => {
        console.log(response.data);
        resp = response.data;
      });

    if (resp == true) {
      await axios.get(`http://localhost:3001/games/${acc}`).then((response) => {
        if (response.data == true) {
          axios
            .post("http://localhost:3001/createGame", {
              acc: acc,
              coin: coin,
              value: bet,
            })
            .then((res) => {
              if (res.data == true) {
                axios
                  .put(`http://localhost:3001/updatefunds`, {
                    acc: acc,
                    value: bet,
                  })
                  .then((res) => {
                    if (res.data == true) {
                      dispatch(dbActions.increment());
                      alert("Game created");
                    } else {
                      alert("error");
                    }
                  });
              }
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
