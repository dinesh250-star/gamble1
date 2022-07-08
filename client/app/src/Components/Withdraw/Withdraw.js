import axios from "axios";
import { Logger } from "ethers/lib/utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import Gamble from "../../artifacts/contracts/Gamble.sol/Gamble.json";
import { dbActions } from "../../store/dbSlice";
const Withdraw = () => {
  const [wValue, setWValue] = useState(1);
  const [withdrawB, setWithdrawB] = useState(false);
  const logInState = useSelector((state) => state.db.loggedIn);
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.db.userAcc);
  const gambleAddress = useSelector((state) => state.db.address);
  if (logInState) {
    document.getElementById("buttonWithdraw").disabled = false;
  }
  const changeValue = (e) => {
    setWValue(e.target.value);
  };
  const updateWithdrawInDb = async () => {
    await axios
      .put(`http://localhost:3001/update/withdraw_amount/${acc}`, {
        matic: wValue,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const revertWithdraw = async () => {
    await axios
      .put(`http://localhost:3001/update/update_withdraw_amount/${acc}`, {
        matic: wValue,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      if (typeof window.ethereum !== "undefined" && logInState === true) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);
        const matic = ethers.utils.parseEther(wValue.toString());
        const transaction = await contract.withdrawB(matic, {
          from: acc,
        });
        updateWithdrawInDb();
        try {
          const receipt = await transaction.wait();
          console.log(transaction, receipt);

          alert("Successful Withdraw");
          dispatch(dbActions.withdrawListener());
          setWValue(1);
        } catch (error) {
          if (error.code === Logger.errors.TRANSACTION_REPLACED) {
            if (error.cancelled) {
              // The transaction was replaced  :'(
              console.log("cancelled");
              console.log(transaction, error.replacement);
              revertWithdraw();
              alert("Transaction Failed");
            } else {
              // The user used "speed up" or something similar
              // in their client, but we now have the updated info
              console.log("speed up");
              console.log(error.replacement, error.receipt);
              alert("Successful Withdraw");
              dispatch(dbActions.withdrawListener());
              setWValue(1);
            }
          }
        }
      }
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
