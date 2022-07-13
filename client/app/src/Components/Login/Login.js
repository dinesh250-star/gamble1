import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { dbActions } from "../../store/dbSlice";
import Balance from "../Balance/Balance";
import LoginCss from "./Login.module.css";
const Login = () => {
  const [userAccount, setUserAccount] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);
  async function requestAccount() {
    if (window.ethereum) {
      let resp;
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]);

        Axios.post("http://localhost:3001/registration", {
          userAccount: accounts[0],
        });

        dispatch(dbActions.logIn());
        dispatch(dbActions.userAccount(accounts[0]));
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    }
  };
  return (
    <>
      <nav className={LoginCss.navbar}>
        <div className={LoginCss.el1}>
          <h1>Gaming Arena</h1>
        </div>
        <div className={LoginCss.el2}>
          <Balance />
        </div>
        <div className={LoginCss.el3}>
          {userAccount ? (
            <h1>{userAccount}</h1>
          ) : (
            <button onClick={connectMetamask} className={LoginCss.connectAcc}>
              Connect Account
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Login;
