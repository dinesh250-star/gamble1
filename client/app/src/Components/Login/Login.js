import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { dbActions } from "../../store/dbSlice";
import LoginCSS from './Login.module.css'


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
    <div>
      <button className={LoginCSS.loginbtn} onClick={connectMetamask}>Connect Wallet</button>
      {/* <h1>Connected Wallet: {userAccount}</h1> */}
   
      
    </div>
  );
};
export default Login;
