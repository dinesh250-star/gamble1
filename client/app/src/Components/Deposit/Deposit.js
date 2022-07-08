import { useState } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
import axios from "axios";
import Gamble from "../../artifacts/contracts/Gamble.sol/Gamble.json";
import { Logger } from "ethers/lib/utils";
const Deposit = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const [matic, setMatic] = useState(1);
  const dispatch = useDispatch();
  const [getUBalance, setGetUBalance] = useState(0);
  const logInState = useSelector((state) => state.db.loggedIn);
  const gambleAddress = useSelector((state) => state.db.address);
  const storeMatic = async (e) => {
    setMatic(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await DepositHandler();
    console.log("succ1");
  };

  if (logInState) {
    document.getElementById("buttonDeposit").disabled = false;
  }
  const dataOfMatic = {
    matic: matic,
  };
  const updateDepositInDb = async () => {
    await axios
      .put(`http://localhost:3001/update/deposited_amount/${acc}`, {
        matic: matic,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DepositHandler = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);

      const transaction = await contract.deposit({
        from: acc,
        value: ethers.utils.parseEther(matic.toString()),
      });

      try {
        const receipt = await transaction.wait();
        console.log(transaction, receipt);
        updateDepositInDb();
        alert("Succesfully Deposited");
        dispatch(dbActions.depositListener());
        setMatic(1);
      } catch (error) {
        if (error.code === Logger.errors.TRANSACTION_REPLACED) {
          if (error.cancelled) {
            // The transaction was replaced  :'(
            console.log("cancelled");
            console.log(transaction, error.replacement);
            alert("Transaction Failed");
          } else {
            // The user used "speed up" or something similar
            // in their client, but we now have the updated info
            console.log("speed up");
            console.log(error.replacement, error.receipt);
            updateDepositInDb();
            alert("Successfully Deposited");
            dispatch(dbActions.depositListener());
            setMatic(1);
          }
        }
      }
    }
  };

  const check = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);

      const transaction = await contract.decrement();
      const receipt = await transaction.wait();
      if (receipt) {
        updateDepositInDb();
      }
    }
  };
  const checks = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, provider);
      let data = await contract.dep();
      console.log(data);
      if (data == true) {
        console.log("finally");
        updateDepositInDb();
      }
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="Enter the matic"
          onChange={storeMatic}
          value={matic}
        ></input>
        <button type="submit" id="buttonDeposit" disabled>
          Deposit
        </button>
      </form>
    </div>
  );
};
export default Deposit;
