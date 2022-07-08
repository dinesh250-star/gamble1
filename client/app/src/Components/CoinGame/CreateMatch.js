import { useState } from "react";

const CreateMatch = () => {
  const [coin, setCoin] = useState("Heads");
  const [bet, setBet] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
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
          onChange={amount}
        ></input>
        <button>Create a Game</button>
      </form>
    </div>
  );
};
export default CreateMatch;
