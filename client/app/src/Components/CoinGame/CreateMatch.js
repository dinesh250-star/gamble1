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
              dispatch(dbActions.increment());
              setGame(true);
              axios
                .get(`http://localhost:3001/yourmatches/${acc}`)
                .then((res) => {
                  if (res.data[0] == "not found") {
                    setNoDisplay(true);
                  } else {
                    setCreator(res.data[0]);
                    setCreatorBet(res.data[1]);
                    setAmounts(res.data[2]);
                  }
                });
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
  const deleteHandler = async (e) => {
    axios.delete(`http://localhost:3001/delete/${acc}`).then((res) => {
      setDel(del + 1);
      setGame(false);
      alert("Deleted Succesfully");
    });
  };
  const yourMatch = (
    <div>
      <ul>
        <li>{creator}</li>
        <li>{creatorBet}</li>
        <li>{amounts}</li>
      </ul>
      <h1>vs</h1>
      <button onClick={deleteHandler}>Cancel</button>
    </div>
  );

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
      {game && yourMatch}
    </div>
  );
};
export default CreateMatch;
