import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const [balance, setBalance] = useState("");
  const deposit = useSelector((state) => state.db.depositCount);
  const withdraw = useSelector((state) => state.db.withdrawCount);
  const acc = useSelector((state) => state.db.userAcc);
  const logIn = useSelector((state) => state.db.loggedIn);
  useEffect(() => {
    const balance = async () => {
      Axios.get(`http://localhost:3001/balance/${acc}`).then((response) => {
        setBalance(response.data[0]);
      });
    };
    if (logIn) {
      balance();
    }
  }, [acc, logIn, deposit, withdraw]);
  //   const balances = async () => {
  //     await Axios.get(`http://localhost:3001/balance/${acc}`).then((response) => {
  //       console.log(response.data[0]);
  //     });
  //   };
  return (
    <div>
      <h1>{balance}</h1>
    </div>
  );
};
export default Balance;
