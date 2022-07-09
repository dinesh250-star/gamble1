const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "gamble",
});
app.put("/updateState/:id", (request, response) => {
  const id = request.params["id"];
  const joiner = request.body.joiner;
  const winner = request.body.winner;
  const winning_toss = request.body.winning_toss;

  db.query(
    "UPDATE match_info SET joiner = ? ,state = ? , winner = ?, winning_toss = ? WHERE id = ?",
    [joiner, "completed", winner, winning_toss, id],
    (err, result) => {
      if (err) {
        response.send(false);
        console.log(err);
      } else {
        console.log(result);
        response.send(true);
      }
    }
  );
});
app.put("/updateBal", (request, response) => {
  const winner = request.body.winner;
  const loser = request.body.loser;
  const amount = request.body.amount;
  let newAmount = amount * 2 * (95 / 100);
  let loserAmount;
  db.query(
    "SELECT coins FROM user_info WHERE address = ?",
    [winner],
    (err, result) => {
      if (err) {
        res.send(false);
        console.log(err);
      } else {
        console.log(newAmount);
        console.log(result[0].coins);
        newAmt = Number(result[0].coins) + Number(newAmount);
        console.log(newAmt);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmt, winner],
          (err, result) => {
            if (err) {
              res.send(false);
              console.log(err);
            } else {
              db.query(
                "SELECT coins FROM user_info WHERE address = ?",
                [loser],
                (err, result) => {
                  if (err) {
                    res.send(false);
                    console.log(error);
                  } else {
                    console.log(result[0].coins);
                    loserAmount = Number(result[0].coins) - Number(amount);
                    db.query(
                      "UPDATE user_info SET coins = ? WHERE address = ?",
                      [loserAmount, loser],
                      (err, result) => {
                        if (err) {
                          res.send(false);
                          console.log(error);
                        } else {
                          res.send(true);
                          console.log("success");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
app.get("/matchdetails/:id", (req, res) => {
  const id = req.params["id"];
  db.query("SELECT * from match_info WHERE id = ?", [id], (err, result) => {
    if (result) {
      console.log("s");
      res.send(result);
    } else {
      res.send(false);
    }
  });
});

app.put("/revertfunds", (request, response) => {
  const id = request.body.acc;
  const matic = request.body.value;
  console.log(id);
  console.log(matic);
  let newAmt;
  db.query(
    "SELECT coins FROM user_info WHERE address = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(matic);
        console.log(result[0].coins);
        newAmt = Number(result[0].coins) + Number(matic);
        console.log(newAmt);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmt, id],
          (err, result) => {
            if (err) {
              response.send(false);
              console.log(err);
            } else {
              response.send(true);
              console.log(result);
            }
          }
        );
      }
    }
  );
});
app.put("/updatefunds", (request, response) => {
  const id = request.body.acc;
  const matic = request.body.value;
  console.log(id);
  console.log(matic);
  let newAmt;
  db.query(
    "SELECT coins FROM user_info WHERE address = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(matic);
        console.log(result[0].coins);
        newAmt = Number(result[0].coins) - Number(matic);
        console.log(newAmt);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmt, id],
          (err, result) => {
            if (err) {
              response.send(false);
              console.log(err);
            } else {
              response.send(true);
              console.log(result);
            }
          }
        );
      }
    }
  );
});
app.delete("/delete/:acc", (req, res) => {
  const acc = req.params["acc"];
  db.query(
    "DELETE FROM match_info WHERE creator = ? AND state = ?",
    [acc, "pending"],
    (err, result) => {
      if (result) {
        console.log(result);
        res.send(true);
      } else {
        console.log(result);
        res.send(false);
      }
    }
  );
});
app.get("/yourmatches/:acc", (req, res) => {
  const acc = req.params["acc"];
  db.query(
    "SELECT * from match_info WHERE creator = ? AND state = ?",
    [acc, "pending"],
    (err, result) => {
      if (result.length == 1) {
        res.send([result[0].creator, result[0].creator_bet, result[0].amount]);
      } else {
        res.send(["not found", "not found", "not found"]);
      }
    }
  );
});
app.get("/othermatches/:acc", (req, res) => {
  const acc = req.params["acc"];
  db.query(
    "SELECT * from match_info WHERE creator != ? AND state = ?",
    [acc, "pending"],
    (err, result) => {
      if (result) {
        res.send(result);
      } else {
        res.send(["not found", "not found", "not found"]);
      }
    }
  );
});
app.post("/createGame", (req, res) => {
  const acc = req.body.acc;
  const value = req.body.value;
  const coin = req.body.coin;
  db.query(
    "INSERT INTO match_info (creator,creator_bet,joiner,joiner_bet,amount,state,winner,winning_toss) VALUES(?,?,?,?,?,?,?,?)",
    [acc, coin, "", "", value, "pending", "", ""],
    (err, result) => {
      if (result) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/games/:acc", (req, res) => {
  const acc = req.params["acc"];
  db.query(
    "SELECT * from match_info WHERE creator = ? AND state = ?",
    [acc, "pending"],
    (err, result) => {
      if (result.length == 0) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  );
});
app.get("/balance/:acc", (req, res) => {
  const acc = req.params["acc"];
  db.query(
    "SELECT coins from user_info WHERE address = ?",
    [acc],
    (err, result) => {
      if (result.length == 1) {
        res.send([result[0].coins]);
      } else {
        console.log("error");
      }
    }
  );
});
app.put("/update/update_withdraw_amount/:acc", (req, res) => {
  const matic = req.body.matic;
  const id = req.params["acc"];
  let newAmtWw;
  db.query(
    "SELECT coins from user_info WHERE address = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        newAmtWw = Number(result[0].coins) + Number(matic);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmtWw, id],
          (err, result) => {
            if (err) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
});
app.put("/update/withdraw_amount/:acc", (request, response) => {
  const matic = request.body.matic;
  const id = request.params["acc"];
  let newAmtW;
  db.query(
    "SELECT coins from user_info WHERE address = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        newAmtW = Number(result[0].coins) - Number(matic);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmtW, id],
          (err, result) => {
            if (err) {
              console.log(error);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
});
app.put("/update/deposited_amount/:acc", (request, response) => {
  const matic = request.body.matic;
  const id = request.params["acc"];
  console.log(id);
  let newAmt;
  db.query(
    "SELECT coins FROM user_info WHERE address = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(matic);
        console.log(result[0].coins);
        newAmt = Number(result[0].coins) + Number(matic);
        console.log(newAmt);
        db.query(
          "UPDATE user_info SET coins = ? WHERE address = ?",
          [newAmt, id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          }
        );
      }
    }
  );
});
app.post("/withdraw", (req, res) => {
  const acc = req.body.acc;
  const value = req.body.value;
  db.query(
    "SELECT coins from user_info WHERE address = ?",
    [acc],
    (err, result) => {
      if (result[0].coins >= value) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  );
});

app.post("/registration", (req, res) => {
  const userAccount = req.body.userAccount;

  db.query(
    "SELECT * FROM user_info WHERE address = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
        res.send(true);
        return;
      } else {
        db.query(
          "INSERT INTO user_info (address,coins) VALUES(?,?)",
          [userAccount, 0],
          (err, result) => {
            if (result) {
              console.log("success");
            }
          }
        );
        res.send(false);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
