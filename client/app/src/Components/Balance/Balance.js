import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const deposit = useSelector((state) => state.db.depositCount);
  const withdraw = useSelector((state) => state.db.withdrawCount);
  const acc = useSelector((state) => state.db.userAcc);
  const logIn = useSelector((state) => state.db.loggedIn);
  const reload = useSelector((state) => state.db.count);
  useEffect(() => {
    const balance = async () => {
      Axios.get(`http://localhost:3001/balance/${acc}`)
        .then((response) => {
          setBalance(response.data[0]);
        })
        .catch((error) => console.log(error));
    };
    if (logIn) {
      balance();
    }
  }, [acc, logIn, deposit, withdraw, reload]);
  //   const balances = async () => {
  //     await Axios.get(`http://localhost:3001/balance/${acc}`).then((response) => {
  //       console.log(response.data[0]);
  //     });
  //   };
  return (
    <div>
      <h1>Balance - {balance} MATIC</h1>
    </div>
  );
};
export default Balance;
