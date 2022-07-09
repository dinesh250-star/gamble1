import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CreateMatch from "../CoinGame/CreateMatch";
import { dbActions } from "../../store/dbSlice";
const DisplayMatch = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.count);
  const logIn = useSelector((state) => state.db.loggedIn);
  const [creator, setCreator] = useState("-");
  const [creatorBet, setCreatorBet] = useState("-");
  const [amount, setAmount] = useState(0);
  const [del, setDel] = useState(0);
  const [noDisplay, setNoDisplay] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logIn) {
      fetchYourMatch();
    }
  }, [logIn, reload, del]);
  const fetchYourMatch = async () => {
    axios.get(`http://localhost:3001/yourmatches/${acc}`).then((res) => {
      if (res.data[0] == "not found") {
        setNoDisplay(true);
      } else {
        setCreator(res.data[0]);
        setCreatorBet(res.data[1]);
        setAmount(res.data[2]);
      }
    });
  };

  const deleteHandler = async (e) => {
    axios.delete(`http://localhost:3001/delete/${acc}`).then((res) => {
      setDel(del + 1);

      alert("Deleted Succesfully");
    });
  };

  const yourMatch = (
    <div>
      <ul>
        <li>{creator}</li>
        <li>{creatorBet}</li>
        <li>{amount}</li>
      </ul>
      <h1>vs</h1>
      <button onClick={deleteHandler}>Cancel</button>
    </div>
  );
  const otherMatch = (
    <div>
      <h1>good</h1>
    </div>
  );
  //   if (logIn && reload) {
  //     fetchYourMatch();
  //   }
  return (
    <div>
      <h1>Your matches</h1>
      {noDisplay || yourMatch}

      <h1>Other matches</h1>
      {otherMatch}
    </div>
  );
};
export default DisplayMatch;
