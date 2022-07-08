import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const DisplayMatch = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const logIn = useSelector((state) => state.db.loggedIn);
  const [creator, setCreator] = useState("-");
  const [creatorBet, setCreatorBet] = useState("-");
  const [amount, setAmount] = useState(0);
  const fetchYourMatch = async () => {
    axios.get(`http://localhost:3001/yourmatches/${acc}`).then((res) => {
      setCreator(res.data[0]);
      setCreatorBet(res.data[1]);
      setAmount(res.data[2]);
    });
  };
  if (logIn) {
    fetchYourMatch();
  }

  const yourMatch = (
    <div>
      <ul>
        <li>{creator}</li>
        <li>{creatorBet}</li>
        <li>{amount}</li>
      </ul>
    </div>
  );
  const otherMatch = (
    <div>
      <h1>good</h1>
    </div>
  );
  const deleteHandler = async (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/delete/${acc}`).then((res) => {
      if (res == true) {
        alert("Deleted Succesfully");
      } else {
        alert("Couldnt Delete");
      }
    });
  };
  return (
    <div>
      <h1>Your matches</h1>
      {yourMatch}
      <h1>vs</h1>
      <button onClick={deleteHandler}>Cancel</button>
      <h1>Other matches</h1>
      {otherMatch}
    </div>
  );
};
export default DisplayMatch;
