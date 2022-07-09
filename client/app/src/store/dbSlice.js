import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const dbSlice = createSlice({
  name: "db",
  initialState: {
    userAcc: "",
    loggedIn: false,
    address: "0x1EcE8f3b4EeB3c9f10804E32d47C67Bb6F30395C",
    depositCount: 0,
    withdrawCount: 0,
    count: 0,
    reload: false,
  },
  reducers: {
    fetchUserData(state, action) {
      const user = action.payload;
      state.users.push({
        id: user.id,
        address: user.address,
        deposited_amount: user.deposited_amount,
        coins: user.coins,
        user_name: user.user_name,
      });
    },
    increment(state, action) {
      state.count += 1;
    },
    authentication(state, action) {
      const acc = action.payload;
      const exists = state.users.findIndex((user) => user.address == acc[0]);
      console.log(exists);
      if (exists == -1) {
        alert("Successfully registered");
      } else {
        alert("Already Registered");
      }
    },
    logIn(state, action) {
      state.loggedIn = true;
    },
    userAccount(state, action) {
      const acc = action.payload;
      state.userAcc = acc;
    },
    depositListener(state, action) {
      state.depositCount += 1;
    },
    withdrawListener(state, action) {
      state.withdrawCount += 1;
    },
    reload(state, action) {
      state.reload = true;
    },
    reloader(state, action) {
      state.reload = false;
    },
  },
});

export const dbActions = dbSlice.actions;

export default dbSlice;
