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
  const gambleAddress = "0x92265B57f08EF2F30dDd6d9CdCac1BD62C1A004b";
  const storeMatic = async (e) => {
    setMatic(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await DepositHandler();
    console.log("succ1");
  };
  // const checkTransaction = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const contract = new ethers.Contract(gambleAddress, Gamble.abi, provider);

  //   // contract.on("Deposit", (payer, amount) => {
  //   //   if (payer) {
  //   //     updateDepositInDb();
  //   //     alert("Succesfully Deposited");
  //   //   } else {
  //   //     alert("Transaction failed");
  //   //   }
  //   // });
  //   // provider.on("block", (blockNumber) => {
  //   //   console.log(blockNumber);
  //   // });
  //   provider.waitForTransaction();
  // };
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
  // const updateV = async () => {
  //   axios.put(`http://localhost:3001/update`);
  // };
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const DepositHandler = async () => {
    if (typeof window.ethereum !== "undefined" && logInState === true) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(gambleAddress, Gamble.abi, signer);
      const transaction = await contract.deposit(acc, {
        value: ethers.utils.parseEther(matic.toString()),
      });

      const receipt = await transaction.wait(1);
      console.log(receipt);
      if (receipt) {
        updateDepositInDb();
      } else {
        alert("transaction failed");
      }
      // const contract2 = new ethers.Contract(
      //   gambleAddress,
      //   Gamble.abi,
      //   provider
      // );

      // contract2.on("Deposit", (payer, amount) => {
      //   if (!payer) {
      //     alert("Transaction failed");
      //   } else {
      //     updateDepositInDb();
      //     alert("Succesfully Deposited");
      //   }
      // });
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
