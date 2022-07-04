import { useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
//bbb
import axios from "axios";
import Gamble from "../../artifacts/contracts/Gamble.sol/Gamble.json";

import DepositCSS from "./Deposit.module.css";

const Deposit = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const [matic, setMatic] = useState(1);

  const [getUBalance, setGetUBalance] = useState(0);
  const logInState = useSelector((state) => state.db.loggedIn);
  const gambleAddress = "0xFAd82d73D50Daf5627d2D107f9acc24F58851c1e";
  const storeMatic = async (e) => {
    setMatic(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await DepositHandler();
    console.log("succ1");
  };
  if (logInState) {
    document.getElementById("button1").disabled = false;
  }
  const dataOfMatic = {
    matic: matic,
  };
  const updateDepositInDb = async () => {
    axios
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
  const getUserBalance = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, provider);
      try {
        const data = await contract.getUserBalance(acc);
        const dataa = data.toString();
        console.log("datau: ", dataa);
        setGetUBalance(dataa);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };
  // const updateV = async () => {
  //   axios.put(`http://localhost:3001/update`);
  // };
  const DepositHandler = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);
      const transaction = await contract.deposit(acc, {
        value: ethers.utils.parseEther(matic.toString()),
      });
      const receipt = await transaction.wait();
      console.log(receipt);
      if (receipt) {
        await updateDepositInDb();
        console.log("succ2");
      } else {
        console.log("Couldnt complete transaction");
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
        <button type="submit" id="button1" disabled>
          Deposit
        </button>
      </form>
      <button onClick={getUserBalance}>Get balance of the User</button>
      <h1>{getUBalance}</h1>
      <h1>{acc}</h1>
    </div>
  );
};
export default Deposit;
