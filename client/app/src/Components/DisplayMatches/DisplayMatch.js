import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { dbActions } from "../../store/dbSlice";
const DisplayMatch = () => {
  const acc = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.count);
  const logIn = useSelector((state) => state.db.loggedIn);
  const [creator, setCreator] = useState("-");
  const [creatorBet, setCreatorBet] = useState("-");
  const [amount, setAmount] = useState(0);
  const [creatorO, setCreatorO] = useState("-");
  const [creatorBetO, setCreatorBetO] = useState("-");
  const [amountO, setAmountO] = useState(0);
  const [del, setDel] = useState(false);
  const [noDisplay, setNoDisplay] = useState(false);
  const [noDisplayO, setNoDisplayO] = useState(false);
  const dispatch = useDispatch();
  const [responser, setResponser] = useState();
  const [d, setD] = useState(false);
  const [disableB, setDisableB] = useState(false);
  useEffect(() => {
    if (logIn) {
      fetchYourMatch();
      fetchOthersMatch();
    }
  }, [logIn, reload, del]);
  const fetchYourMatch = async () => {
    axios.get(`http://localhost:3001/yourmatches/${acc}`).then((res) => {
      if (res.data[0] == "not found") {
        setNoDisplay(true);
        setDisableB(true);
      } else {
        setCreator(res.data[0]);
        setCreatorBet(res.data[1]);
        setAmount(res.data[2]);
        setD(true);
      }
    });
  };

  const deleteHandler = async (e) => {
    axios.delete(`http://localhost:3001/delete/${acc}`).then((res) => {
      if (res.data == true) {
        axios
          .put(`http://localhost:3001/revertfunds`, {
            acc: acc,
            value: amount,
          })
          .then((res) => {
            if (res.data == true) {
              setD(false);
              dispatch(dbActions.increment());
              alert("Deleted Succesfully");
            } else {
              alert("error rev");
            }
          });
      }
    });
  };
  let otherMatch = <h1>yes</h1>;

  const fetchOthersMatch = async () => {
    await axios.get(`http://localhost:3001/othermatches/${acc}`).then((res) => {
      if (res.data[0] == "not found") {
        setNoDisplayO(false);
      } else {
        setNoDisplayO(true);
        setResponser(res.data);
        // setCreatorO(res.data[0]);
        // setCreatorBetO(res.data[1]);
        // setAmountO(res.data[2]);
      }
    });
  };
  if (logIn && disableB) {
    document.addEventListener("DOMContentLoaded", function (event) {
      document.getElementById("Button").disabled = true;
    });
  }
  const yourMatch = (
    <div>
      <ul>
        <li>{creator}</li>
        <li>{creatorBet}</li>
        <li>{amount}</li>
      </ul>
      <h1>vs</h1>
      <button onClick={deleteHandler} id="btn">
        Cancel
      </button>
    </div>
  );

  //   if (logIn && reload) {
  //     fetchYourMatch();
  //   }
  const joinHandler = async () => {};
  return (
    <div>
      <h1>Your matches</h1>
      {d ? yourMatch : <h1>No matches</h1>}

      <h1>Other matches</h1>
      <div>
        {noDisplayO ? (
          responser.map((r) => {
            return (
              <div key={r.id}>
                <ul>
                  <li>{r.creator}</li>
                  <li>{r.creator_bet}</li>
                  <li>{r.amount}</li>

                  <h1>vs</h1>
                  <button onClick={joinHandler}>Join</button>
                </ul>
              </div>
            );
          })
        ) : (
          <h1>No matches</h1>
        )}
      </div>
    </div>
  );
};
export default DisplayMatch;
