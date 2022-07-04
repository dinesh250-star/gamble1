import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
const Withdraw = () => {
  const [wValue, setWValue] = useState(5);
  const [withdrawB, setWithdrawB] = useState(false);
  const logInState = useSelector((state) => state.db.loggedIn);
  const acc = useSelector((state) => state.db.userAcc);
  if (logInState) {
    document.getElementById("buttonWithdraw").disabled = false;
  }
  const changeValue = (e) => {
    setWValue(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    let res;
    await axios
      .post("http://localhost:3001/withdraw", {
        acc: acc,
        value: wValue,
      })
      .then((response) => {
        console.log(response.data);
        res = response.data;
      });
    if (res == true) {
    } else {
      alert("Not enough funds");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="withdraw"
          value={wValue}
          onChange={changeValue}
        ></input>
        <button type="submit" id="buttonWithdraw" disabled>
          Withdraw
        </button>
      </form>
    </div>
  );
};
export default Withdraw;
