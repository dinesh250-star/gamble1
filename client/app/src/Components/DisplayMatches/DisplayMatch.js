import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DisplayMatchesCss from "./DisplayMatches.module.css";
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
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (logIn) {
      fetchYourMatch();
      fetchOthersMatch();
    }
  }, [logIn, reload, del]);
  const fetchYourMatch = async () => {
    axios.get(`http://localhost:3001/yourmatches/${acc}`).then((res) => {
      if (res.data[0] == "not found") {
        console.log("e");
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
    <div className={DisplayMatchesCss.bgmi}>
      <div className={DisplayMatchesCss.ym}>
        <ul className={DisplayMatchesCss.pos}>
          <li>{creator}</li>
          <li>{creatorBet}</li>
          <li>{amount} MATIC</li>
        </ul>
        <h1 className={DisplayMatchesCss.h1font}>vs</h1>
        <button
          onClick={deleteHandler}
          id="btn"
          className={DisplayMatchesCss.btn}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const joinHandler = async (e) => {
    const id = e.target.value;
    await axios.get(`http://localhost:3001/matchdetails/${id}`).then((res) => {
      if (res.data == false) {
        alert("Match details not found");
      } else {
        console.log(res.data[0]);
        const id = res.data[0].id;
        const creator_bet = res.data[0].creator_bet;
        const creator = res.data[0].creator;
        const amount = res.data[0].amount;

        axios.get(`http://localhost:3001/balance/${acc}`).then((response) => {
          // setBalance(response.data[0]);
          const joiner_balance = response.data[0];
          if (joiner_balance >= amount) {
            // algo
            const a = Math.floor(Math.random() * 10);
            //if even then heads or else tails;
            let result = "Error";
            if (a % 2 === 0) {
              result = "Heads";
            } else {
              result = "Tails";
            }
            console.log(result);

            if (result == creator_bet) {
              console.log("creator wins");
              alert(`Result - ${result}, Creator wins`);
              axios
                .put(`http://localhost:3001/updateState/${id}`, {
                  joiner: acc,
                  winner: creator,
                  winning_toss: result,
                })
                .then((res) => {
                  if (res.data == true) {
                    console.log("match complete");
                    axios
                      .put(`http://localhost:3001/updateBal`, {
                        winner: creator,
                        loser: acc,
                        amount: amount,
                      })
                      .then((res) => {
                        if (res.data == true) {
                          dispatch(dbActions.increment());
                          console.log("update done");
                        } else {
                          console.log("eror");
                        }
                      });
                  } else {
                    alert("failed");
                  }
                });
            } else {
              // joiner wins
              console.log("joiner wins");
              alert(`Result - ${result}, Joiner wins`);
              axios
                .put(`http://localhost:3001/updateState/${id}`, {
                  joiner: acc,
                  winner: acc,
                  winning_toss: result,
                })
                .then((res) => {
                  if (res.data == true) {
                    console.log("match complete");
                    axios
                      .put(`http://localhost:3001/updateBall`, {
                        winner: acc,

                        amount: amount,
                      })
                      .then((res) => {
                        if (res.data == true) {
                          dispatch(dbActions.increment());
                          console.log("update done");
                        } else {
                          console.log("eror");
                        }
                      });
                  } else {
                    alert("failed");
                  }
                });
            }
          } else {
            alert("not enough bet amt");
          }
        });
      }
    });
  };
  return (
    <>
      <div>
        <h1 className={DisplayMatchesCss.bg}>Matches</h1>
        <hr></hr>
        <h1 className={DisplayMatchesCss.bga}>Your matches</h1>

        {d ? (
          yourMatch
        ) : (
          <div>
            <h1 className={DisplayMatchesCss.bj}>Currently no matches</h1>
            <hr></hr>
          </div>
        )}

        <h1
          style={{
            color: "white",
            backgroundColor: "black",
            margin: "0",
            padding: "2rem",
          }}
        >
          Other matches
        </h1>
        <div className={DisplayMatchesCss.bgom}>
          {noDisplayO ? (
            responser.map((r) => {
              return (
                <div key={r.id} className={DisplayMatchesCss.om}>
                  <ul className={DisplayMatchesCss.pos}>
                    <li>{r.creator}</li>
                    <li>{r.creator_bet}</li>
                    <li>{r.amount} MATIC</li>

                    <h1>vs</h1>
                    <button
                      onClick={joinHandler}
                      value={r.id}
                      className={DisplayMatchesCss.btn}
                    >
                      Join
                    </button>
                  </ul>
                </div>
              );
            })
          ) : (
            <h1
              style={{
                color: "white",
                backgroundColor: "black",
                margin: "0",
                padding: "2rem",
              }}
            >
              Currently No matches
            </h1>
          )}
        </div>
      </div>
    </>
  );
};
export default DisplayMatch;
