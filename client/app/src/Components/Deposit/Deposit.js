import { useState } from "react";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
//b
import axios from "axios";
import Gamble from "../../artifacts/contracts/Gamble.sol/Gamble.json";
const Deposit = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const [matic, setMatic] = useState(1);

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

  const DepositHandler = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);

      const transaction = await contract.deposit({
        from: acc,
        value: ethers.utils.parseEther(matic.toString()),
      });
      const receipt = await transaction.wait();
      console.log(receipt);
      if (receipt) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);
        const transaction = await contract.decrement({
          from: acc,
        });
        const receipt = await transaction.wait();
        if (receipt) {
          updateDepositInDb();
          alert("Registered Successfully");
        } else {
          console.log("error");
        }
      } else {
        console.log("ERror depositing");
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
      <button type="button" onClick={check}>
        Check
      </button>
    </div>
  );
};
export default Deposit;
