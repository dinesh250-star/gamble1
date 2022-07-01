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
app.put("/update", (request, res) => {
  db.query(
    "UPDATE user_info SET coins =  ? WHERE id = 1",

    [2.111],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
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
app.post("/registration", (req, res) => {
  const userAccount = req.body.userAccount;

  db.query(
    "SELECT * FROM user_info WHERE address = ?",
    [userAccount],
    (err, result) => {
      if (result.length > 0) {
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
      }
    }
  );
});
app.listen(3001, () => {
  console.log("server is running");
});
